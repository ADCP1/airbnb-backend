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

export class UpdateExperienceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsPositive()
  capacity?: number;

  @IsOptional()
  @IsPositive()
  duration?: number;

  @IsOptional()
  @IsUrl(undefined, { each: true })
  imagesUrls?: string[];

  @Type(() => Date)
  @IsDate()
  @Validate(IsAfterNowConstraint)
  date?: Date;

  @IsOptional()
  @IsIn(experienceTypes)
  type?: ExperienceType;

  @IsOptional()
  @IsIn(experienceLangues, { each: true })
  languages?: ExperienceLanguage[];

  @IsOptional()
  @IsIn(experienceCategories)
  category?: ExperienceCategory;

  @IsOptional()
  @IsIn(accessibilityTypes, { each: true })
  accessibility?: ExperienceAccessibility[];
}
