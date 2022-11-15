import { Entity } from '@domain';

import { ExperienceAccessibility } from './experience-accessibility.enum';
import { ExperienceCategory } from './experience-category.enum';
import { ExperienceLanguage } from './experience-language.enum';
import { ExperienceType } from './experience-type.enum';

export type ExperienceArgs = {
  id?: string;
  organizerId: string;
  type: ExperienceType;
  title: string;
  description: string;
  price: number;
  capacity: number;
  location: string;
  duration: number; // in hours
  imagesUrls: string[];
  dates: Date[];
  accessibility: ExperienceAccessibility[];
  languages: ExperienceLanguage[];
  category: ExperienceCategory;
};

export class Experience extends Entity {
  public organizerId: string;
  public type: ExperienceType;
  public title: string;
  public description: string;
  public price: number;
  public capacity: number;
  public location: string;
  public duration: number;
  public imagesUrls: string[];
  public dates: Date[];
  public languages: ExperienceLanguage[];
  public accessibility: ExperienceAccessibility[];
  public category: ExperienceCategory;

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
    this.languages = args.languages;
    this.accessibility = args.accessibility;
    this.category = args.category;
  }
}
