import { User } from '@domain/user';
import { IUserService, userService } from '@services';
import { Request } from '@shared';
import {
  LoginUserDto,
  TokenCredentialsDto,
  RegisterUserDto,
  UserProfileDto,
} from './dtos';

interface IUserController {
  login(req: Request<UserCredentialsDto>): Promise<TokenCredentialsDto>;
  logout(req: Request): Promise<void>;
  register(req: Request<UserCredentialsDto>): Promise<TokenCredentialsDto>;
  update(req: Request<UserProfileDto>): Promise<User>;
}

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async login(
    req: Request<UserCredentialsDto>,
  ): Promise<TokenCredentialsDto> {
    return this.userService.login(req.body.username, req.body.password);
  }

  public async logout(req: Request) {
    return this.userService.logout(req.user.username);
  }

  public async register(
    req: Request<UserCredentialsDto>,
  ): Promise<TokenCredentialsDto> {
    return this.userService.register(req.body.username, req.body.password);
  }

  public async update(req: Request<UserProfileDto>): Promise<User> {
    return this.userService.update(req.body);
  }
}

const userController: IUserController = new UserController(userService);

export { IUserController, userController };
