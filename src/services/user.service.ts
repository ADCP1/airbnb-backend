import { IUserRepository, User } from '@domain/user';
import { userRepository } from '@infra/user';
import { NotFoundException } from '@shared';
import { UserRegisterDto } from 'controllers/user/dtos/request/user-register.dto';
import { authService, IAuthService } from './auth.service';

interface IUserService {
  login(
    username: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }>;
  logout(username: string): Promise<void>;
  register(
    user: UserRegisterDto,
  ): Promise<{ token: string; refreshToken: string }>;
}

class UserService implements IUserService {
  private userRepository: IUserRepository;
  private authService: IAuthService;

  constructor(userRespository: IUserRepository, authService: IAuthService) {
    this.userRepository = userRespository;
    this.authService = authService;
  }

  public async login(
    username: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const hashedPassword = this.authService.hashPassword(password);
    const user = await this.userRepository.findOneByUsername(username);
    if (!user || hashedPassword !== user.password) {
      throw new NotFoundException(
        'Credentials are incorrect or user does not exist',
      );
    }
    return this.authService.generateTokens(username);
  }

  public async logout(username: string): Promise<void> {
    return this.authService.deleteRefreshToken(username);
  }

  public async register({
    name,
    lastName,
    email,
    phone,
    dateOfBirth,
    password,
  }: UserRegisterDto): Promise<{ token: string; refreshToken: string }> {
    await this.userRepository.save(
      new User({
        name,
        lastName,
        email,
        phone,
        dateOfBirth,
        password,
      }),
    );
    return this.authService.generateTokens(name);
  }
}

const userService: IUserService = new UserService(userRepository, authService);

export { IUserService, userService };
