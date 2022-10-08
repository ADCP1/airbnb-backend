import { IUserService, userService } from '@services';
import { Request, Response } from '@shared';
import { CreateUserDto } from './dtos';

interface IUserController {
  login(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
  register(req: Request<CreateUserDto>, res: Response): Promise<void>;
}

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async login(req: Request, res: Response) {
    res.json(
      await this.userService.login(req.body.username, req.body.password),
    );
  }

  public async logout(req: Request, res: Response) {
    await this.userService.logout(req.user.username);
    res.status(200).send();
  }

  public async register(req: Request<CreateUserDto>, res: Response) {
    res.json(
      await this.userService.register(req.body.username, req.body.password),
    );
  }
}

const userController: IUserController = new UserController(userService);

export { IUserController, userController };
