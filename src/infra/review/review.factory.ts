import { ResourceType, Review } from '@domain/review';
import { LeanDocument, Types } from 'mongoose';

export class ReviewFactory {
  public static fromReviewDoc(
    reviewDoc: LeanDocument<
      Omit<Review, 'id' | 'resourceType'> & {
        _id: Types.ObjectId;
        resourceType: string;
      }
    >,
  ): Review {
    return new Review({
      id: reviewDoc._id.toString(),
      resourceId: reviewDoc.resourceId.toString(),
      resourceType: reviewDoc.resourceType as ResourceType,
      reviewerId: reviewDoc.reviewerId.toString(),
      comment: reviewDoc.comment,
      rating: reviewDoc.rating,
      updatedAt: reviewDoc.updatedAt,
    });
  }
}
