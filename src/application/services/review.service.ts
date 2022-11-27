import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReviewRepository, Review } from '@domain/review';
import { User } from '@domain/user';
import { reviewRepository } from '@infra/review';
import { DomainException, NotFoundException } from '@shared';

import { ReviewFactory } from './review.factory';
import { IUserService, userService } from './user.service';

interface IReviewService {
  create(
    reviewDto: RequestDtos.CreateReviewDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.ReviewDto>;
}

class ReviewService implements IReviewService {
  private reviewRepository: IReviewRepository;
  private userService: IUserService;

  constructor(reviewRepository: IReviewRepository, userService: IUserService) {
    this.reviewRepository = reviewRepository;
    this.userService = userService;
  }

  public async create(
    reviewDto: RequestDtos.CreateReviewDto,
    reviewerEmail: string,
  ): Promise<ResponseDtos.ReviewDto> {
    const reviewer = await this.getReviewerFromEmail(reviewerEmail);
    // validate that resource exists
    const review = new Review({
      ...reviewDto,
      reviewerId: reviewer.id!,
    });
    await this.reviewRepository.save(review);
    return ReviewFactory.toDto(review);
  }

  private async getReviewerFromEmail(email: string): Promise<User> {
    const reviewer = await this.userService.findFromEmail(email);
    if (!reviewer) {
      throw new NotFoundException('User creating the review does not exist');
    }
    return reviewer;
  }
}

const reviewService: IReviewService = new ReviewService(
  reviewRepository,
  userService,
);

export { IReviewService, reviewService };
