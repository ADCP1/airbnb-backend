import { IUserRepository, User } from '@domain/user';
import { userRepository } from '@infra/user';
import { NotFoundException } from '@shared';
import {
  LoginUserDto,
  RegisterUserDto,
  UserProfileDto,
  UserDto,
} from 'controllers/user/dtos';
import { authService, IAuthService } from './auth.service';

interface IUserService {
  login(
    userDto: LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  logout(username: string): Promise<void>;
  register(
    userDto: RegisterUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  update(userEmail: string, userDto: UserProfileDto): Promise<UserDto>;
}

const SHOWABLE_DIGITS = 4;
const FILLER_CHAR = 'X';

class UserService implements IUserService {
  private userRepository: IUserRepository;
  private authService: IAuthService;

  constructor(userRepository: IUserRepository, authService: IAuthService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async login(
    userDto: LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const hashedPassword = this.authService.hashPassword(userDto.password);
    const user = await this.userRepository.findOneByEmail(userDto.email);
    if (!user || hashedPassword !== user.password) {
      throw new NotFoundException(
        'Credentials are incorrect or user does not exist',
      );
    }
    return this.authService.generateTokens(userDto.email);
  }

  public async logout(username: string): Promise<void> {
    return this.authService.deleteRefreshToken(username);
  }

  public async register(
    userDto: RegisterUserDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const userAlreadyExists = await this.userRepository.findOneByEmail(
      userDto.email,
    );
    if (userAlreadyExists) {
      throw new NotFoundException('A user with that email already exists');
    }
    await this.userRepository.save(new User(userDto));
    return this.authService.generateTokens(userDto.email);
  }

  public async update(
    userEmail: string,
    userDto: UserProfileDto,
  ): Promise<UserDto> {
    const user = await this.userRepository.findOneByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Could not identify user with given email');
    }
    const newUser = new User({ ...user, ...userDto });
    const updatedUser: UserDto = await this.userRepository.save(newUser);
    if (updatedUser.creditCardInfo?.creditCardNumber) {
      const cardNumber = updatedUser.creditCardInfo.creditCardNumber;
      const fillerLength = cardNumber.length - SHOWABLE_DIGITS;
      updatedUser.creditCardInfo.creditCardNumber =
        FILLER_CHAR.repeat(fillerLength) + cardNumber.slice(fillerLength);
    }
    return updatedUser;
  }
}

const userService: IUserService = new UserService(userRepository, authService);

export { IUserService, userService };
