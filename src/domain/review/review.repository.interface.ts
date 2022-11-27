import { Review } from './review.entity';

export interface IReviewRepository {
  save(review: Review): Promise<void>;
}
