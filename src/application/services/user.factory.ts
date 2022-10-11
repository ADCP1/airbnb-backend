import { ResponseDtos } from '@application/dtos';
import { User } from '@domain/user';

export class UserFactory {
  public static toDto(user: User): ResponseDtos.UserDto {
    return {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth.toISOString(),
      phone: user.phone,
      description: user.description,
      languages: user.languages,
      location: user.location,
      profession: user.profession,
      pictureUrl: user.pictureUrl,
    };
  }
}
