import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReviewRepository, ResourceType, Review } from '@domain/review';
import { User } from '@domain/user';
import { reviewRepository } from '@infra/review';
import { NotFoundException } from '@shared';

import { experienceService, IExperienceService } from './experience.service';
import { IPropertyService, propertyService } from './property.service';
import { ReviewFactory } from './review.factory';
import { IUserService, userService } from './user.service';

interface IReviewService {
  create(
    reviewDto: RequestDtos.CreateReviewDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.ReviewDto>;
  getPropertyReviews(propertyId: string): Promise<ResponseDtos.ReviewsDto>;
  getExperienceReviews(experienceId: string): Promise<ResponseDtos.ReviewsDto>;
  getHostReviews(hostId: string): Promise<ResponseDtos.ReviewsDto>;
  getGuestReviews(guestId: string): Promise<ResponseDtos.ReviewsDto>;
  partialUpdate(
    reviewId: string,
    reviewDto: RequestDtos.UpdateReviewDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.ReviewDto>;
  delete(reviewId: string, ownerEmail: string): Promise<void>;
}

class ReviewService implements IReviewService {
  private reviewRepository: IReviewRepository;
  private userService: IUserService;
  private propertyService: IPropertyService;
  private experienceService: IExperienceService;

  constructor(
    reviewRepository: IReviewRepository,
    userService: IUserService,
    propertyService: IPropertyService,
    experienceService: IExperienceService,
  ) {
    this.reviewRepository = reviewRepository;
    this.userService = userService;
    this.propertyService = propertyService;
    this.experienceService = experienceService;
  }

  public async create(
    reviewDto: RequestDtos.CreateReviewDto,
    reviewerEmail: string,
  ): Promise<ResponseDtos.ReviewDto> {
    const reviewer = await this.getReviewerFromEmail(reviewerEmail);
    await this.validateResourceExistence(
      reviewDto.resourceId,
      reviewDto.resourceType,
    );
    const review = new Review({
      ...reviewDto,
      updatedAt: new Date(),
      reviewerId: reviewer.id!,
    });
    await this.reviewRepository.save(review);
    return ReviewFactory.toDto(review);
  }

  public async getPropertyReviews(
    propertyId: string,
  ): Promise<ResponseDtos.ReviewsDto> {
    const reviews = await this.reviewRepository.getResourceReviews(
      propertyId,
      ResourceType.Property,
    );
    return {
      reviews: reviews.map((review) => ReviewFactory.toDto(review)),
    };
  }

  public async getExperienceReviews(
    experienceId: string,
  ): Promise<ResponseDtos.ReviewsDto> {
    const reviews = await this.reviewRepository.getResourceReviews(
      experienceId,
      ResourceType.Experience,
    );
    return {
      reviews: reviews.map((review) => ReviewFactory.toDto(review)),
    };
  }

  public async getHostReviews(
    hostId: string,
  ): Promise<ResponseDtos.ReviewsDto> {
    const reviews = await this.reviewRepository.getResourceReviews(
      hostId,
      ResourceType.Host,
    );
    return {
      reviews: reviews.map((review) => ReviewFactory.toDto(review)),
    };
  }

  public async getGuestReviews(
    guestId: string,
  ): Promise<ResponseDtos.ReviewsDto> {
    const reviews = await this.reviewRepository.getResourceReviews(
      guestId,
      ResourceType.Guest,
    );
    return {
      reviews: reviews.map((review) => ReviewFactory.toDto(review)),
    };
  }

  public async partialUpdate(
    reviewId: string,
    reviewDto: RequestDtos.UpdateReviewDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.ReviewDto> {
    const owner = await this.getReviewerFromEmail(ownerEmail);
    const review = await this.getReviewById(reviewId);
    this.validateReviewOwnership(review, owner);
    const updatedReview = new Review({
      ...review,
      ...reviewDto,
      updatedAt: new Date(),
    });
    await this.reviewRepository.save(updatedReview);
    return ReviewFactory.toDto(updatedReview);
  }

  public async delete(reviewId: string, ownerEmail: string): Promise<void> {
    const owner = await this.getReviewerFromEmail(ownerEmail);
    const review = await this.getReviewById(reviewId);
    this.validateReviewOwnership(review, owner);
    await this.reviewRepository.delete(reviewId);
  }

  private validateReviewOwnership(review: Review, user: User): void {
    if (review.reviewerId !== user.id) {
      throw new Error('You are not allowed to update this review');
    }
  }

  private async getReviewById(reviewId: string): Promise<Review> {
    const review = await this.reviewRepository.getById(reviewId);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  private async getReviewerFromEmail(email: string): Promise<User> {
    const reviewer = await this.userService.findFromEmail(email);
    if (!reviewer) {
      throw new NotFoundException('User creating the review does not exist');
    }
    return reviewer;
  }

  private async validateResourceExistence(
    resourceId: string,
    resourceType: ResourceType,
  ): Promise<void> {
    switch (resourceType) {
      case ResourceType.Property:
        await this.propertyService.getById(resourceId);
        break;
      case ResourceType.Experience:
        await this.experienceService.getById(resourceId);
        break;
      default:
        await this.userService.getById(resourceId);
    }
  }
}

const reviewService: IReviewService = new ReviewService(
  reviewRepository,
  userService,
  propertyService,
  experienceService,
);

export { IReviewService, reviewService };
