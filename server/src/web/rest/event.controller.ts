import { Controller, Get, Logger, Param, Req, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MyEventDTO } from '../../service/dto/my-event.dto';
import { MyEventService } from '../../service/my-event.service';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { MoreThan } from 'typeorm';
import { format } from 'date-fns';

@Controller('api/events')
@UseInterceptors(LoggingInterceptor)
@ApiUseTags('events')
export class EventController {
  logger = new Logger('EventController');

  constructor(private readonly myEventService: MyEventService) {
  }

  @Get('/upcoming')
  @ApiResponse({
    status: 200,
    description: 'List 5 upcoming events',
    type: MyEventDTO
  })
  async getAll(@Req() req: Request): Promise<MyEventDTO[]> {
    const [results, count] = await this.myEventService.findAndCount({
      where: { eventStart: MoreThan(format(new Date(), 'YYYY-MM-DD HH:mm')) },
      skip: 0,
      take: 4,
      order: { eventStart: 'ASC' }
    });
    // HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Event detail',
    type: MyEventDTO
  })
  async getOne(@Param('id') id: string): Promise<MyEventDTO> {
    return await this.myEventService.findById(id);
  }

}
