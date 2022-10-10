import { RequestDtos, ResponseDtos } from 'application/dtos';
import { IUserRepository, User } from '@domain/user';
import { userRepository } from '@infra/user';
import { NotFoundException } from '@shared';
import { authService, IAuthService } from './auth.service';

interface IUserService {
  login(
    userDto: RequestDtos.LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  logout(username: string): Promise<void>;
  register(
    userDto: RequestDtos.RegisterUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  update(
    userEmail: string,
    userDto: RequestDtos.UserProfileDto,
  ): Promise<ResponseDtos.UserDto>;
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
    userDto: RequestDtos.LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.userRepository.findOneByEmail(userDto.email);
    const isValidLogin =
      user && this.authService.isValidPassword(userDto.password, user.password);
    if (!isValidLogin) {
      throw new NotFoundException('Invalid credentials');
    }
    return this.authService.generateTokens(userDto.email);
  }

  public async logout(username: string): Promise<void> {
    return this.authService.deleteRefreshToken(username);
  }

  public async register(
    userDto: RequestDtos.RegisterUserDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const userAlreadyExists = await this.userRepository.findOneByEmail(
      userDto.email,
    );
    if (userAlreadyExists) {
      throw new NotFoundException('A user with that email already exists');
    }

    const hashedPassword = this.authService.hashPassword(userDto.password);
    await this.userRepository.save(
      new User({
        ...userDto,
        password: hashedPassword,
      }),
    );

    return this.authService.generateTokens(userDto.email);
  }

  public async update(
    userEmail: string,
    userDto: RequestDtos.UserProfileDto,
  ): Promise<ResponseDtos.UserDto> {
    const user = await this.userRepository.findOneByEmail(userEmail);
    if (!user) {
      throw new NotFoundException('Could not identify user with given email');
    }
    const newUser = new User({ ...user, ...userDto });
    const updatedUser: ResponseDtos.UserDto = await this.userRepository.save(
      newUser,
    );
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
