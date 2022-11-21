import { RequestDtos, ResponseDtos } from '@application/dtos';
import {
  Experience,
  ExperienceType,
  IExperienceRepository,
} from '@domain/experience';
import { User } from '@domain/user';
import { experienceRepository } from '@infra/experience';
import {
  BadRequestException,
  DomainException,
  NotFoundException,
} from '@shared';

import { ExperienceFactory } from './experience.factory';
import { IUserService, userService } from './user.service';

interface IExperienceService {
  create(
    experienceDto: RequestDtos.CreateExperienceDto,
    hostEmail: string,
  ): Promise<ResponseDtos.ExperienceDto>;
  partialUpdate(
    experienceId: string,
    experienceDto: RequestDtos.UpdateExperienceDto,
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
    if (
      experienceDto.type == ExperienceType.InPlace &&
      !experienceDto.capacity
    ) {
      throw new BadRequestException(
        'capacity is required for and in place experience',
      );
    }
    const organizer = await this.getUserFromEmail(guestEmail);
    const experience = new Experience({
      ...experienceDto,
      organizerId: organizer.id!,
      capacity: experienceDto.capacity ?? -1,
    });
    await this.experienceRepository.save(experience);
    return ExperienceFactory.toDto(experience);
  }

  public async partialUpdate(
    experienceId: string,
    experienceDto: RequestDtos.UpdateExperienceDto,
    guestEmail: string,
  ): Promise<ResponseDtos.ExperienceDto> {
    const organizer = await this.getUserFromEmail(guestEmail);
    const experience = await this.getExperienceFromId(experienceId);
    if (organizer.id !== experience.organizerId) {
      throw new DomainException('Experience does not belong to the user');
    }
    const updatedExperience = new Experience({
      ...experience,
      ...experienceDto,
    });
    await this.experienceRepository.save(updatedExperience);
    return ExperienceFactory.toDto(updatedExperience);
  }

  private async getUserFromEmail(email: string): Promise<User> {
    const user = await this.userService.findFromEmail(email);
    if (!user) {
      throw new NotFoundException(`Organizer does not exist`);
    }
    return user;
  }

  private async getExperienceFromId(id: string): Promise<Experience> {
    const experience = await this.experienceRepository.findById(id);
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    return experience;
  }
}

const experienceService: IExperienceService = new ExperienceService(
  experienceRepository,
  userService,
);

export { experienceService, IExperienceService };
