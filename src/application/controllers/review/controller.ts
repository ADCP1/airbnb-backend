import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IReviewService, reviewService } from '@application/services';
import { Request } from '@shared';

interface IReviewController {
  create(
    req: Request<RequestDtos.CreateReviewDto>,
  ): Promise<ResponseDtos.ReviewDto>;
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

  // public async getGuestReviews(
  //   req: Request,
  //   reservableType: ReservableType,
  // ): Promise<ResponseDtos.ReviewDto[]> {
  //   const status = getReviewStatusIn(req.query.status as string);
  //   return this.reviewService.getGuestReviews(
  //     req.user.email,
  //     status,
  //     reservableType,
  //   );
  // }

  // public async getHostReviews(
  //   req: Request,
  //   reservableType: ReservableType,
  // ): Promise<ResponseDtos.ReviewDto[]> {
  //   const status = getReviewStatusIn(req.query.status as string);
  //   return this.reviewService.getHostReviews(
  //     req.user.email,
  //     status,
  //     reservableType,
  //   );
  // }
}

const reviewController: IReviewController = new ReviewController(reviewService);

export { IReviewController, reviewController };
