import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddWishRequestDto } from './dto/request/add-wish.dto';
import { UpdateWishListRequestDto } from './dto/request/update-wish-list.dto';
import { UpdateWishRequestDto } from './dto/request/update-wish.dto';
import { GetWishListResponseDto } from './dto/response/get-wish-list.dto';
import { WishListService } from './wish-list.service';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Get()
  getWishList(): Promise<GetWishListResponseDto[]> {
    return this.wishListService.getWishList();
  }

  @Post()
  addWish(@Body() dto: AddWishRequestDto): Promise<void> {
    return this.wishListService.addWishToTheList({ dto });
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (file.filename) {
      return { filename: file.filename };
    } else {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  updateWish(@Body() dto: UpdateWishRequestDto): Promise<void> {
    return this.wishListService.updateWish({ dto });
  }

  @Patch('wishes')
  updateWishList(@Body() dto: UpdateWishListRequestDto): Promise<void> {
    return this.wishListService.updateWishList({ dto });
  }

  @Delete(':id')
  deleteWish(@Param('id') id) {
    return this.wishListService.deleteWish(id);
  }
}
