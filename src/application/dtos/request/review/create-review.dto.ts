import { getResourceTypeValues, ResourceType } from '@domain/review';
import {
  IsIn,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

const resourceTypeValues = getResourceTypeValues();

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  public resourceId: string;

  @IsIn(resourceTypeValues)
  public resourceType: ResourceType;

  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  public rating: number;
}
