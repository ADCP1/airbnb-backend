import { ResponseDtos } from '@application/dtos';
import { Property } from '@domain/property';

export class PropertyFactory {
  public static toDto(property: Property): ResponseDtos.PropertyDto {
    return {
      id: property.id!,
      ownerId: property.ownerId,
      capacity: property.capacity,
      imagesUrls: property.imagesUrls,
      location: property.location,
      price: property.price,
      roomAmount: property.roomAmount,
      surfaceArea: property.surfaceArea,
      title: property.title,
      toiletAmount: property.toiletAmount,
      description: property.description,
      isPetFriendly: property.isPetFriendly,
      rules: property.rules,
      amenities: property.amenities,
    };
  }
}
