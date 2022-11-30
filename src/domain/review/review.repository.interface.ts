import { Review } from './review.entity';

export interface IReviewRepository {
  save(review: Review): Promise<void>;
  getResourceReviews(
    resourceId: string,
    resourceType: string,
  ): Promise<Review[]>;
  getById(reviewId: string): Promise<Review | null>;
  delete(reviewId: string): Promise<void>;
}
