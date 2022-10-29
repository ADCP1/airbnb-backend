import { Entity } from '@domain';

import { PropertyAmenity } from './property-amenity.enum';

export type PropertyArgs = {
  id?: string;
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
  /**
   * In squared meters
   */
  rules?: string[];
  isPetFriendly?: boolean;
};

export class Property extends Entity {
  public ownerId: string;
  public location: string;
  public title: string;
  public price: number;
  public capacity: number;
  public roomAmount: number;
  public toiletAmount: number;
  public surfaceArea: number;
  public imagesUrls: string[];
  public description?: string;
  public amenities?: PropertyAmenity[];
  /**
   * In squared meters
   */
  public rules?: string[];
  public isPetFriendly?: boolean;

  constructor(args: PropertyArgs) {
    super(args.id);
    this.ownerId = args.ownerId;
    this.location = args.location;
    this.title = args.title;
    this.price = args.price;
    this.capacity = args.capacity;
    this.roomAmount = args.roomAmount;
    this.toiletAmount = args.toiletAmount;
    this.surfaceArea = args.surfaceArea;
    this.imagesUrls = args.imagesUrls;
    this.description = args.description;
    this.amenities = args.amenities;
    this.rules = args.rules;
    this.isPetFriendly = args.isPetFriendly;
  }
}
