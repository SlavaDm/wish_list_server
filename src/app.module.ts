import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './core/database.module';
import { WishListModule } from './wish-list/wish-list.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets', 'images'),
      serveRoot: '/assets/images',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    WishListModule,
  ],
})
export class AppModule {}
