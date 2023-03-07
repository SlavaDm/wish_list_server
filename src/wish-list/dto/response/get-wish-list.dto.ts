import { ApiProperty } from '@nestjs/swagger';

export class GetWishListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;

  @ApiProperty({ default: 'Default' })
  priority: string;

  @ApiProperty({ default: '' })
  imageSrc: string;

  @ApiProperty()
  order: number;
}
