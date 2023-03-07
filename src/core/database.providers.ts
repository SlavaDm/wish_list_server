import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Wishes } from './models/wish-list/wishes.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get<Dialect>('DB_DIALECT'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        timezone: configService.get<string>('DB_TIMEZONE'),
        query: { raw: true },
        logging: false,
      });
      sequelize.addModels([Wishes]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
