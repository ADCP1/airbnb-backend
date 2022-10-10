import { IUserService, userService } from '@application';
import { RequestDtos, ResponseDtos } from '@application/dtos';
import { Request } from '@shared';

interface IUserController {
  login(
    req: Request<RequestDtos.LoginUserDto>,
  ): Promise<ResponseDtos.TokenCredentialsDto>;
  logout(req: Request): Promise<void>;
  register(req: Request<RequestDtos.RegisterUserDto>): Promise<ResponseDtos.TokenCredentialsDto>;
  update(req: Request<RequestDtos.UserProfileDto>): Promise<ResponseDtos.UserDto>;
}

class UserController {
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
    return this.userService.logout(req.user.username);
  }

  public async register(
    req: Request<RequestDtos.RegisterUserDto>,
  ): Promise<ResponseDtos.TokenCredentialsDto> {
    return this.userService.register(req.body);
  }

  public async update(req: Request<RequestDtos.UserProfileDto>): Promise<ResponseDtos.UserDto> {
    return this.userService.update(req.query.email as string, req.body);
  }
}

const userController: IUserController = new UserController(userService);

export { IUserController, userController };
