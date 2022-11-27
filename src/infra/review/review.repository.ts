import { IReviewRepository, Review } from '@domain/review';
import { loadObjectIdentification } from '@infra/identification';
import { DomainException } from '@shared';
import cloneDeep from 'clone-deep';

import { ReviewDoc } from './review.doc';

class ReviewRepository implements IReviewRepository {
  public async save(review: Review) {
    loadObjectIdentification(review);
    await ReviewDoc.updateOne(
      { _id: review.id },
      { $set: cloneDeep({ ...review }) },
      { upsert: true },
    );
  }
}

export const reviewRepository: IReviewRepository = new ReviewRepository();
