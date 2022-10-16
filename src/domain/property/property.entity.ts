import { Entity } from '@domain';

import { PropertyAmenity } from './property-amenity.enum';

export type PropertyArgs = {
  id?: string;
  location: string;
  title: string;
  price: number;
  capacity: number;
  roomAmount: number;
  toiletAmount: number;
  surfaceArea: number;
  imagesUrls: string[];
  description?: string;
  services?: PropertyAmenity[];
  /**
   * In squared meters
   */
  rules?: string[];
  isPetFriendly?: boolean;
};

export class Property extends Entity {
  public location: string;
  public title: string;
  public price: number;
  public capacity: number;
  public roomAmount: number;
  public toiletAmount: number;
  public surfaceArea: number;
  public imagesUrls: string[];
  public description?: string;
  public services?: PropertyAmenity[];
  /**
   * In squared meters
   */
  public rules?: string[];
  public isPetFriendly?: boolean;

  constructor(args: PropertyArgs) {
    super(args.id);
    this.location = args.location;
    this.title = args.title;
    this.price = args.price;
    this.capacity = args.capacity;
    this.roomAmount = args.roomAmount;
    this.toiletAmount = args.toiletAmount;
    this.surfaceArea = args.surfaceArea;
    this.imagesUrls = args.imagesUrls;
    this.description = args.description;
    this.services = args.services;
    this.rules = args.rules;
    this.isPetFriendly = args.isPetFriendly;
  }
}
