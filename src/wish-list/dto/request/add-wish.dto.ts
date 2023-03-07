import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddWishRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ default: 'Default' })
  @IsNotEmpty()
  @IsString()
  priority: string;

  @ApiProperty({ default: '' })
  @IsString()
  imageSrc: string;
}
