import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { MyEventDTO } from '../../service/dto/my-event.dto';
import { MyEventService } from '../../service/my-event.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/my-events')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('my-events')
export class MyEventController {
  logger = new Logger('MyEventController');

  constructor(private readonly myEventService: MyEventService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: MyEventDTO
  })
  async getAll(@Req() req: Request): Promise<MyEventDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.myEventService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: MyEventDTO
  })
  async getOne(@Param('id') id: string): Promise<MyEventDTO> {
    return await this.myEventService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create myEvent' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MyEventDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() myEventDTO: MyEventDTO): Promise<MyEventDTO> {
    const created = await this.myEventService.save(myEventDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MyEvent', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update myEvent' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MyEventDTO
  })
  async put(@Req() req: Request, @Body() myEventDTO: MyEventDTO): Promise<MyEventDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MyEvent', myEventDTO.id);
    return await this.myEventService.update(myEventDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete myEvent' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'MyEvent', id);
    return await this.myEventService.deleteById(id);
  }
}
