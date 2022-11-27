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
}

export const reviewRepository: IReviewRepository = new ReviewRepository();
