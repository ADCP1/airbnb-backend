import { ResourceType } from '@domain/review';

export type ReviewDto = {
  id: string;
  resourceId: string;
  resourceType: ResourceType;
  reviewerId: string;
  comment: string;
  rating: number;
  updatedAt: Date;
};

export type ReviewsDto = {
  properties: ReviewDto[];
};
