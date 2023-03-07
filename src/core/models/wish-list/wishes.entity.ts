import { ApiProperty } from '@nestjs/swagger';

import {
  Table,
  Column,
  Model,
  Unique,
  NotEmpty,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Wishes extends Model {
  @ApiProperty()
  @NotEmpty
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty()
  @NotEmpty
  @Column
  order: number;

  @ApiProperty()
  @NotEmpty
  @Column
  text: string;

  @ApiProperty()
  @NotEmpty
  @Column
  priority: string;

  @ApiProperty()
  @Column
  imageSrc: string;

  @ApiProperty()
  @NotEmpty
  @Column
  createdAt: Date;

  @ApiProperty()
  @NotEmpty
  @Column
  updatedAt: Date;
}
