import { IUserService, userService } from '@application';
import { RequestDtos, ResponseDtos } from '@application/dtos';
import { Request } from '@shared';

interface IUserController {
  login(
    req: Request<RequestDtos.LoginUserDto>,
  ): Promise<ResponseDtos.TokenCredentialsDto>;
  logout(req: Request): Promise<void>;
  register(
    req: Request<RequestDtos.RegisterUserDto>,
  ): Promise<ResponseDtos.TokenCredentialsDto>;
  partialUpdate(
    req: Request<RequestDtos.UpdateUserDto>,
  ): Promise<ResponseDtos.UserDto>;
}

class UserController implements IUserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async login(
    req: Request<RequestDtos.LoginUserDto>,
  ): Promise<ResponseDtos.TokenCredentialsDto> {
    return this.userService.login(req.body);
  }

  public async logout(req: Request) {
    return this.userService.logout(req.user.email);
  }

  public async register(
    req: Request<RequestDtos.RegisterUserDto>,
  ): Promise<ResponseDtos.TokenCredentialsDto> {
    return this.userService.register(req.body);
  }

  public async partialUpdate(
    req: Request<RequestDtos.UpdateUserDto>,
  ): Promise<ResponseDtos.UserDto> {
    return this.userService.partialUpdate(req.user.email, req.body);
  }
}

const userController: IUserController = new UserController(userService);

export { IUserController, userController };
