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
import { IsAfterNowConstraint } from '@shared';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Validate,
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

  @IsOptional()
  @IsPositive()
  capacity?: number;

  @IsPositive()
  duration: number;

  @IsUrl(undefined, { each: true })
  imagesUrls: string[];

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @Validate(IsAfterNowConstraint)
  date: Date;

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
