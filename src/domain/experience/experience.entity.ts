import { Entity } from '@domain';

export type ExperienceArgs = {
  id?: string;
  organizerId: string;
  type: string;
  title: string;
  description: string;
  price: number;
  capacity: number;
  location: string;
  duration: number; // in hours
  imagesUrls: string[];
  dates: Date[];
};

export class Experience extends Entity {
  public organizerId: string;
  public type: string;
  public title: string;
  public description: string;
  public price: number;
  public capacity: number;
  public location: string;
  public duration: number;
  public imagesUrls: string[];
  public dates: Date[];

  constructor(args: ExperienceArgs) {
    super(args.id);
    this.organizerId = args.organizerId;
    this.type = args.type;
    this.title = args.title;
    this.description = args.description;
    this.price = args.price;
    this.capacity = args.capacity;
    this.location = args.location;
    this.duration = args.duration;
    this.imagesUrls = args.imagesUrls;
    this.dates = args.dates;
  }
}
