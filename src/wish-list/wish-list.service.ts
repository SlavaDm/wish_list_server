import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Wishes } from 'src/core/models/wish-list/wishes.entity';
import { AddWishRequestDto } from './dto/request/add-wish.dto';
import { UpdateWishListRequestDto } from './dto/request/update-wish-list.dto';
import { UpdateWishRequestDto } from './dto/request/update-wish.dto';
import { GetWishListResponseDto } from './dto/response/get-wish-list.dto';

@Injectable()
export class WishListService {
  constructor(
    @Inject('WISHES_REPOSITORY')
    private wishListRepository: typeof Wishes,
  ) {}
  async getWishList(): Promise<GetWishListResponseDto[]> {
    const wishList =
      (await this.wishListRepository.findAll()) as any as GetWishListResponseDto[];

    return wishList;
  }

  async addWishToTheList({ dto }: { dto: AddWishRequestDto }): Promise<void> {
    const { text, priority, imageSrc } = dto;
    const countWishes = await this.getCountWishes();

    const order = countWishes + 1;

    await this.wishListRepository
      .create({
        text,
        priority,
        imageSrc,
        order,
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateWish({ dto }: { dto: UpdateWishRequestDto }): Promise<void> {
    const wish = await this.wishListRepository.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!wish) {
      throw new HttpException('Wish is not exists', HttpStatus.NOT_FOUND);
    }

    await this.wishListRepository
      .update(
        { ...dto },
        {
          where: {
            id: dto.id,
          },
        },
      )
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async getCountWishes() {
    const countWishes = await this.wishListRepository.count();
    return countWishes;
  }

  async deleteWish(id: string) {
    const id_number = parseInt(id);

    if (id_number <= 0) {
      throw new HttpException('Incorrect id', HttpStatus.BAD_REQUEST);
    }

    const wish = await this.wishListRepository.findOne({
      where: {
        id: id_number,
      },
    });

    if (!wish) {
      throw new HttpException('Wish is not exists', HttpStatus.NOT_FOUND);
    }

    await this.wishListRepository
      .destroy({
        where: {
          id: id_number,
        },
      })
      .catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
  }

  async updateWishList({ dto }: { dto: UpdateWishListRequestDto }) {
    if (dto.wishList.length) {
      await Promise.all(
        dto.wishList.map(async (wish: UpdateWishRequestDto) => {
          await this.updateWish({ dto: wish });
        }),
      ).catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    }
  }
}
