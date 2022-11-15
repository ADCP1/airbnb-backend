import { RequestDtos, ResponseDtos } from '@application/dtos';
import { Experience, IExperienceRepository } from '@domain/experience';
import { User } from '@domain/user';
import { experienceRepository } from '@infra/experience';
import { NotFoundException } from '@shared';

import { ExperienceFactory } from './experience.factory';
import { IUserService, userService } from './user.service';

interface IExperienceService {
  create(
    propertyDto: RequestDtos.CreateExperienceDto,
    hostEmail: string,
  ): Promise<ResponseDtos.ExperienceDto>;
}

class ExperienceService implements IExperienceService {
  private experienceRepository: IExperienceRepository;
  private userService: IUserService;

  constructor(
    experienceRepository: IExperienceRepository,
    userService: IUserService,
  ) {
    this.experienceRepository = experienceRepository;
    this.userService = userService;
  }

  public async create(
    experienceDto: RequestDtos.CreateExperienceDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ExperienceDto> {
    const organizer = await this.getUserFromEmail(guestEmail);
    const experience = new Experience({
      ...experienceDto,
      organizerId: organizer.id!,
    });
    await this.experienceRepository.save(experience);
    return ExperienceFactory.toDto(experience);
  }

  private async getUserFromEmail(email: string): Promise<User> {
    const user = await this.userService.findFromEmail(email);
    if (!user) {
      throw new NotFoundException(`Organizer does not exist`);
    }
    return user;
  }
}

const experienceService: IExperienceService = new ExperienceService(
  experienceRepository,
  userService,
);

export { experienceService, IExperienceService };
