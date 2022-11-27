import { ResponseDtos } from '@application/dtos';
import { Review } from '@domain/review';

export class ReviewFactory {
  public static toDto(reservation: Review): ResponseDtos.ReviewDto {
    return {
      id: reservation.id!,
      resourceId: reservation.resourceId,
      resourceType: reservation.resourceType,
      reviewerId: reservation.reviewerId,
      comment: reservation.comment,
      rating: reservation.rating,
      updatedAt: reservation.updatedAt!,
    };
  }
}
