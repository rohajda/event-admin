/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A MyEvent DTO object.
 */
export class MyEventDTO extends BaseDTO {
  @IsNotEmpty()
  @MaxLength(120)
  @ApiModelProperty({ description: 'title field' })
  title: string;

  @IsNotEmpty()
  @MaxLength(2000)
  @ApiModelProperty({ description: 'description field' })
  description: string;

  @ApiModelProperty({ description: 'fullDay field', required: false })
  fullDay: boolean;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'eventStart field' })
  eventStart: Date;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'eventEnd field' })
  eventEnd: Date;

  @MaxLength(200)
  @IsOptional()
  @ApiModelProperty({ description: 'location field', required: false })
  location: string;


  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
