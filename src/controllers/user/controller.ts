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

  public login(req: Request, res: Response): void {
    try {
      res.json(this.userService.login(req.body.username, req.body.password));
    } catch (error) {
      res.status(409).send('Incorrect username or password');
    }
  }

  public logout(req: Request, res: Response): void {
    try {
      this.userService.logout(req.user.username);
      res.status(200).send();
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  public register(req: Request<CreateUserDto>, res: Response): void {
    try {
      res.json(this.userService.register(req.body.username, req.body.password));
    } catch (error) {
      res.status(409).send('Account already exists');
    }
  }
}

const userController: IUserController = new UserController(userService);

export { IUserController, userController };
