import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { wishesProviders } from 'src/core/models/wish-list/wishes.providers';
import { WishListController } from './wish-list.controller';
import { WishListService } from './wish-list.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './assets/images',
    }),
  ],
  controllers: [WishListController],
  providers: [WishListService, ...wishesProviders],
})
export class WishListModule {}
