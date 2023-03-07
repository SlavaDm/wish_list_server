import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateWishRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ default: 'Default' })
  @IsNotEmpty()
  priority: string;

  @ApiProperty({ default: '' })
  imageSrc: string;

  @ApiProperty()
  @IsNotEmpty()
  order: string;
}
