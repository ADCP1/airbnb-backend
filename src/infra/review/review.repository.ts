import { IReviewRepository, ResourceType, Review } from '@domain/review';
import { loadObjectIdentification } from '@infra/identification';
import { DomainException } from '@shared';
import cloneDeep from 'clone-deep';

import { ReviewDoc } from './review.doc';
import { ReviewFactory } from './review.factory';

class ReviewRepository implements IReviewRepository {
  public async save(review: Review) {
    loadObjectIdentification(review);
    await ReviewDoc.updateOne(
      { _id: review.id },
      { $set: cloneDeep({ ...review }) },
      { upsert: true },
    );
  }

  public async getResourceReviews(
    resourceId: string,
    resourceType: ResourceType,
  ): Promise<Review[]> {
    const reviews = await ReviewDoc.find({
      resourceId,
      resourceType,
    });
    return reviews.map((review) => ReviewFactory.fromReviewDoc(review));
  }

  public async getById(reviewId: string): Promise<Review | null> {
    const review = await ReviewDoc.findOne({ _id: reviewId });
    if (!review) {
      return null;
    }
    return ReviewFactory.fromReviewDoc(review);
  }

  public async delete(reviewId: string): Promise<void> {
    await ReviewDoc.deleteOne({ _id: reviewId });
  }
}

export const reviewRepository: IReviewRepository = new ReviewRepository();
