import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReviewService, reviewService } from '@application/services';
import { Request } from '@shared';

interface IReviewController {
  create(
    req: Request<RequestDtos.CreateReviewDto>,
  ): Promise<ResponseDtos.ReviewDto>;
  getPropertyReviews(req: Request): Promise<ResponseDtos.ReviewsDto>;
  getExperienceReviews(req: Request): Promise<ResponseDtos.ReviewsDto>;
  getHostReviews(req: Request): Promise<ResponseDtos.ReviewsDto>;
  getGuestReviews(req: Request): Promise<ResponseDtos.ReviewsDto>;
  partialUpdate(req: Request): Promise<ResponseDtos.ReviewDto>;
  delete(req: Request): Promise<void>;
}

class ReviewController implements IReviewController {
  private reviewService: IReviewService;

  constructor(reviewService: IReviewService) {
    this.reviewService = reviewService;
  }

  public async create(
    req: Request<RequestDtos.CreateReviewDto>,
  ): Promise<ResponseDtos.ReviewDto> {
    return this.reviewService.create(req.body, req.user.email);
  }

  public async getPropertyReviews(
    req: Request,
  ): Promise<ResponseDtos.ReviewsDto> {
    return this.reviewService.getPropertyReviews(req.params.propertyId);
  }

  public async getExperienceReviews(
    req: Request,
  ): Promise<ResponseDtos.ReviewsDto> {
    return this.reviewService.getExperienceReviews(req.params.experienceId);
  }

  public async getHostReviews(req: Request): Promise<ResponseDtos.ReviewsDto> {
    return this.reviewService.getHostReviews(req.params.hostId);
  }

  public async getGuestReviews(req: Request): Promise<ResponseDtos.ReviewsDto> {
    return this.reviewService.getGuestReviews(req.params.guestId);
  }

  public async partialUpdate(req: Request): Promise<ResponseDtos.ReviewDto> {
    return this.reviewService.partialUpdate(
      req.params.reviewId,
      req.body,
      req.user.email,
    );
  }

  public async delete(req: Request): Promise<void> {
    return this.reviewService.delete(req.params.reviewId, req.user.email);
  }
}

const reviewController: IReviewController = new ReviewController(reviewService);

export { IReviewController, reviewController };
