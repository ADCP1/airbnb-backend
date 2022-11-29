import { getResourceTypeValues } from '@domain/review';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

const resourceTypeValues = getResourceTypeValues();

export class UpdateReviewDto {
  @IsString()
  public comment?: string;

  @Min(0)
  @Max(5)
  public rating?: number;
}
