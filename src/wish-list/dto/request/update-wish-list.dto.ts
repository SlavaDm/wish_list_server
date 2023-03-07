import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UpdateWishRequestDto } from './update-wish.dto';

export class UpdateWishListRequestDto {
  @ApiProperty({ type: [UpdateWishRequestDto] })
  wishList: UpdateWishRequestDto[];
}
