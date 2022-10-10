import { IUserService, userService } from '@services';
import { Request } from '@shared';
import { UserCredentialsDto, TokenCredentialsDto } from './dtos';
import { UserRegisterDto } from './dtos/request/user-register.dto';

interface IUserController {
  login(req: Request<UserCredentialsDto>): Promise<TokenCredentialsDto>;
  logout(req: Request): Promise<void>;
  register(req: Request<UserRegisterDto>): Promise<TokenCredentialsDto>;
}

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async login(
    req: Request<UserCredentialsDto>,
  ): Promise<TokenCredentialsDto> {
    return this.userService.login(req.body.email, req.body.password);
  }

  public async logout(req: Request) {
    return this.userService.logout(req.user.username);
  }

  public async register(
    req: Request<UserRegisterDto>,
  ): Promise<TokenCredentialsDto> {
    return this.userService.register(req.body);
  }
}

const userController: IUserController = new UserController(userService);

export { IUserController, userController };
