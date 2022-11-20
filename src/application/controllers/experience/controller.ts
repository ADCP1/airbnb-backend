import { RequestDtos, ResponseDtos } from '@application/dtos';
import { experienceService, IExperienceService } from '@application/services';
import { Request } from '@shared';

interface IExperienceController {
  create(
    req: Request<RequestDtos.CreateExperienceDto>,
  ): Promise<ResponseDtos.ExperienceDto>;
  partialUpdate(
    req: Request<RequestDtos.UpdateExperienceDto>,
  ): Promise<ResponseDtos.ExperienceDto>;
  get(
    req: Request<void, { experienceId: string }>,
  ): Promise<ResponseDtos.ExperienceDto>;
  getUserExperiences(req: Request<void>): Promise<ResponseDtos.ExperiencesDto>; // TODO return array of properties
}

class ExperienceController implements IExperienceController {
  private experienceService: IExperienceService;

  constructor(experienceService: IExperienceService) {
    this.experienceService = experienceService;
  }

  public async create(
    req: Request<RequestDtos.CreateExperienceDto>,
  ): Promise<ResponseDtos.ExperienceDto> {
    return this.experienceService.create(req.body, req.user.email);
  }

  public async partialUpdate(
    req: Request<RequestDtos.UpdateExperienceDto>,
  ): Promise<ResponseDtos.ExperienceDto> {
    return this.experienceService.partialUpdate(
      req.params.experienceId,
      req.body,
      req.user.email,
    );
  }

  public async get(
    req: Request<void, { experienceId: string }>,
  ): Promise<ResponseDtos.ExperienceDto> {
    return this.experienceService.getById(req.params.experienceId);
  }

  public async getUserExperiences(
    req: Request<void>,
  ): Promise<ResponseDtos.ExperiencesDto> {
    return this.experienceService.getMyExperiences(req.user.email);
  }
}

const experienceController: IExperienceController = new ExperienceController(
  experienceService,
);

export { experienceController, IExperienceController };
