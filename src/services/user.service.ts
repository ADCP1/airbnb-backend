import { IUserRepository, User } from '@domain/user';
import { userRepository } from '@infra';
import { authService, IAuthService } from './auth.service';

interface IUserService {
  login(
    username: string,
    password: string,
  ): { token: string; refreshToken: string };
  logout(username: string): void;
  register(
    username: string,
    password: string,
  ): { token: string; refreshToken: string };
}

class UserService implements IUserService {
  private userRepository: IUserRepository;
  private authService: IAuthService;

  constructor(userRespository: IUserRepository, authService: IAuthService) {
    this.userRepository = userRespository;
    this.authService = authService;
  }

  public login(
    username: string,
    password: string,
  ): { token: string; refreshToken: string } {
    const hashedPassword = this.authService.hashPassword(password);
    const user = this.userRepository.findOneByUsername(username);
    if (!user || hashedPassword !== user.password) {
      throw new Error('Credentials are incorrect or user does not exist');
    }
    return this.authService.generateTokens(username);
  }

  public logout(username: string): void {
    this.authService.deleteRefreshToken(username);
  }

  public register(
    username: string,
    password: string,
  ): { token: string; refreshToken: string } {
    this.userRepository.save(
      new User({
        username,
        password,
      }),
    );
    return this.authService.generateTokens(username);
  }
}

const userService: IUserService = new UserService(userRepository, authService);

export { IUserService, userService };
