import { IUserRepository, User } from '@domain/user';
import { userRepository } from '@infra/user';
import { NotFoundException } from '@shared';
import { LoginUserDto, RegisterUserDto, UserProfileDto } from 'controllers/user/dtos';
import { authService, IAuthService } from './auth.service';

interface IUserService {
  login(
    userDto: LoginUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  logout(username: string): Promise<void>;
  register(
    userDto: RegisterUserDto,
  ): Promise<{ token: string; refreshToken: string }>;
  update(
    userDto: UserProfileDto
  ): Promise<User>;
}

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
    await this.userRepository.save(new User(userDto));
    return this.authService.generateTokens(userDto.email);
  }

  public async update(userDto: UserProfileDto): Promise<User> {
    return this.userRepository.update(userDto);
  }
}

const userService: IUserService = new UserService(userRepository, authService);

export { IUserService, userService };
