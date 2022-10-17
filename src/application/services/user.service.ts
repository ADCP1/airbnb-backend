import { RequestDtos, ResponseDtos } from '@application/dtos';
import { CreditCardInfo, IUserRepository, User } from '@domain/user';
import { userRepository } from '@infra/user';
import { DomainException, NotFoundException } from '@shared';

import { authService, IAuthService } from './auth.service';
import { UserFactory } from './user.factory';

interface IUserService {
  login(
    userDto: RequestDtos.LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  logout(email: string): Promise<void>;
  register(
    userDto: RequestDtos.RegisterUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  partialUpdate(
    userEmail: string,
    userDto: RequestDtos.UpdateUserDto,
  ): Promise<ResponseDtos.UserDto>;
  findFromEmail(email: string): Promise<User | null>;
}

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

  public async logout(email: string): Promise<void> {
    return this.authService.deleteRefreshToken(email);
  }

  public async register(
    userDto: RequestDtos.RegisterUserDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const userAlreadyExists =
      (await this.userRepository.findOneByEmail(userDto.email)) !== null;
    if (userAlreadyExists) {
      throw new DomainException('A user with that email already exists');
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

  public async partialUpdate(
    userEmail: string,
    userDto: RequestDtos.UpdateUserDto,
  ): Promise<ResponseDtos.UserDto> {
    const user = await this.userRepository.findOneByEmail(userEmail);
    if (!user) throw new NotFoundException('User not found');
    const updatedUser = new User({
      ...user,
      ...userDto,
      creditCardInfo: new CreditCardInfo(userDto.creditCardInfo),
    });
    await this.userRepository.save(updatedUser);
    return UserFactory.toDto(updatedUser);
  }

  public async findFromEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }
}

const userService: IUserService = new UserService(userRepository, authService);

export { IUserService, userService };
