import { Entity } from '@domain';

import { ResourceType } from './resource-type';

export type ReviewArgs = {
  id?: string;
  resourceId: string;
  resourceType: ResourceType;
  reviewerId: string;
  comment: string;
  rating: number;
  updatedAt?: Date;
};

export class Review extends Entity {
  public resourceId: string;
  public resourceType: ResourceType;
  public reviewerId: string;
  public comment: string;
  public rating: number;
  public updatedAt: Date | undefined;

  constructor(args: ReviewArgs) {
    super(args.id);
    this.resourceId = args.resourceId;
    this.resourceType = args.resourceType;
    this.reviewerId = args.reviewerId;
    this.comment = args.comment;
    this.rating = args.rating;
    this.updatedAt = args.updatedAt;
  }
}
