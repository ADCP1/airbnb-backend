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
  getById(experienceId: string): Promise<ResponseDtos.ExperienceDto>;
  getMyExperiences(ownerEmail: string): Promise<ResponseDtos.ExperiencesDto>;
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

  public async getById(
    propertyId: string,
  ): Promise<ResponseDtos.ExperienceDto> {
    const experience = await this.experienceRepository.findById(propertyId);
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }
    return ExperienceFactory.toDto(experience);
  }

  public async getMyExperiences(
    ownerEmail: string,
  ): Promise<ResponseDtos.ExperiencesDto> {
    const owner = await this.getOwnerFromEmail(ownerEmail);
    console.log('owner email: ' + ownerEmail);
    console.log('owner id: ' + owner.id);
    const experiences = await this.experienceRepository.findByOwnerId(
      owner.id!,
    );
    return {
      experiences: experiences.map((experience) =>
        ExperienceFactory.toDto(experience),
      ),
    };
  }

  private async getOwnerFromEmail(email: string): Promise<User> {
    const owner = await this.userService.findFromEmail(email);
    if (!owner) {
      throw new NotFoundException('User creating the property does not exist');
    }
    return owner;
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
