import { Wishes } from './wishes.entity';

export const wishesProviders = [
  {
    provide: 'WISHES_REPOSITORY',
    useValue: Wishes,
  },
];
