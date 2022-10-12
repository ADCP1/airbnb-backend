import { ResponseDtos } from '@application/dtos';
import { getCreditCardType, User } from '@domain/user';

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
      creditCardInfo: user.creditCardInfo
        ? {
            type: getCreditCardType(user.creditCardInfo.number),
            lastDigits: user.creditCardInfo.number.slice(-4),
          }
        : undefined,
    };
  }
}
