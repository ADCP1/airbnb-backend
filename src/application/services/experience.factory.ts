import { ResponseDtos } from '@application/dtos';
import { Experience } from '@domain/experience';

export class ExperienceFactory {
  public static toDto(experience: Experience): ResponseDtos.ExperienceDto {
    return {
      id: experience.id!,
      ownerId: experience.ownerId,
      title: experience.title,
      description: experience.description,
      type: experience.type,
      price: experience.price,
      capacity: experience.capacity,
      consumedCapacity: experience.consumedCapacity,
      location: experience.location!,
      duration: experience.duration,
      imagesUrls: experience.imagesUrls,
      date: experience.date,
      languages: experience.languages,
      accessibility: experience.accessibility,
      category: experience.category,
    };
  }
}
