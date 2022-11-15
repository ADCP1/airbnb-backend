import {
  ExperienceAccessibility,
  ExperienceCategory,
  ExperienceLanguage,
  ExperienceType,
  getExperienceAccessibilityValues,
  getExperienceCategoriesValues,
  getExperienceLanguagesValues,
  getExperienceTypesValues,
} from '@domain/experience';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

const experienceTypes = getExperienceTypesValues();
const accessibilityTypes = getExperienceAccessibilityValues();
const experienceCategories = getExperienceCategoriesValues();
const experienceLangues = getExperienceLanguagesValues();

export class CreateExperienceDto {
  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsPositive()
  price: number;

  @IsPositive()
  capacity: number;

  @IsPositive()
  duration: number;

  @IsUrl(undefined, { each: true })
  imagesUrls: string[];

  // @Type(() => Date)
  @IsNotEmpty()
  @IsDateString(undefined, { each: true })
  dates: Date[];

  @IsNotEmpty()
  @IsIn(experienceTypes)
  type: ExperienceType;

  @IsNotEmpty()
  @IsIn(experienceLangues, { each: true })
  languages: ExperienceLanguage[];

  @IsNotEmpty()
  @IsIn(accessibilityTypes, { each: true })
  accessibility: ExperienceAccessibility[];

  @IsNotEmpty()
  @IsIn(experienceCategories)
  category: ExperienceCategory;
}
