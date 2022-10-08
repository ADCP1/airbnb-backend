import { IUserService, userService } from '@services';
import { Request, Response } from '@shared';
import { CreateUserDto } from './dtos';

interface IUserController {
  login(req: Request, res: Response): void;
  logout(req: Request, res: Response): void;
  register(req: Request<CreateUserDto>, res: Response): void;
}

class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  public async login(req: Request, res: Response) {
    try {
      res.json(
        await this.userService.login(req.body.username, req.body.password),
      );
    } catch (error) {
      res.status(409).send('Incorrect username or password');
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      await this.userService.logout(req.user.username);
      res.status(200).send();
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  public async register(req: Request<CreateUserDto>, res: Response) {
    try {
      res.json(
        await this.userService.register(req.body.username, req.body.password),
      );
    } catch (error) {
      res.status(409).send('Account already exists');
    }
  }
}

const userController: IUserController = new UserController(userService);

export { IUserController, userController };
