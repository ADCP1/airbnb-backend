import { Review } from './review.entity';

export interface IReviewRepository {
  save(review: Review): Promise<void>;
  getResourceReviews(
    resourceId: string,
    resourceType: string,
  ): Promise<Review[]>;
}
