/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
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
  eventStart: any;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'eventEnd field' })
  eventEnd: any;

  @MaxLength(200)
  @ApiModelProperty({ description: 'location field', required: false })
  location: string;

  @ApiModelProperty({ description: 'eventImage field', required: false })
  eventImage: any;

  eventImageContentType: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
