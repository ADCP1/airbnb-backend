import { ResponseDtos } from '@application/dtos';
import { Experience } from '@domain/experience';

export class ExperienceFactory {
  public static toDto(experience: Experience): ResponseDtos.ExperienceDto {
    return {
      id: experience.id!,
      organizerId: experience.organizerId,
      title: experience.title,
      description: experience.description,
      type: experience.type,
      price: experience.price,
      capacity: experience.capacity,
      location: experience.location,
      duration: experience.duration,
      imagesUrls: experience.imagesUrls,
      dates: experience.dates,
    };
  }
}
