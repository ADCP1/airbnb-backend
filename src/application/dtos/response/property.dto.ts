import { PropertyAmenity } from '@domain/property';

export type PropertyDto = {
  id: string;
  ownerId: string;
  location: string;
  title: string;
  price: number;
  capacity: number;
  roomAmount: number;
  toiletAmount: number;
  surfaceArea: number;
  imagesUrls: string[];
  description?: string;
  amenities?: PropertyAmenity[];
  rules?: string[];
  isPetFriendly?: boolean;
};
