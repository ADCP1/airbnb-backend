import { Entity } from '@domain';

import { ExperienceAccessibility } from './experience-accessibility.enum';
import { ExperienceCategory } from './experience-category.enum';
import { ExperienceLanguage } from './experience-language.enum';
import { ExperienceType } from './experience-type.enum';

export type ExperienceArgs = {
  id?: string;
  ownerId: string;
  type: ExperienceType;
  title: string;
  description: string;
  price: number;
  capacity: number;
  consumedCapacity: number;
  location?: string;
  duration: number; // in hours
  imagesUrls: string[];
  date: Date;
  accessibility: ExperienceAccessibility[];
  languages: ExperienceLanguage[];
  category: ExperienceCategory;
};

export class Experience extends Entity {
  public ownerId: string;
  public type: ExperienceType;
  public title: string;
  public description: string;
  public price: number;
  public capacity: number;
  public consumedCapacity: number;
  public location?: string;
  public duration: number;
  public imagesUrls: string[];
  public date: Date;
  public languages: ExperienceLanguage[];
  public accessibility: ExperienceAccessibility[];
  public category: ExperienceCategory;

  constructor(args: ExperienceArgs) {
    super(args.id);
    this.ownerId = args.ownerId;
    this.type = args.type;
    this.title = args.title;
    this.description = args.description;
    this.price = args.price;
    this.capacity = args.capacity;
    this.consumedCapacity = args.consumedCapacity;
    this.location = args.location;
    this.duration = args.duration;
    this.imagesUrls = args.imagesUrls;
    this.date = args.date;
    this.languages = args.languages;
    this.accessibility = args.accessibility;
    this.category = args.category;
  }
}
