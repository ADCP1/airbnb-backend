import { Request, Response } from '@shared';
import { IAuthService, authService } from '@services';

interface IAuthController {
  generateNewToken(rq: Request, res: Response): void;
}

class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  public generateNewToken(req: Request, res: Response) {
    try {
      res.json({
        jwtString: this.authService.generateJWT(req.body.refreshToken),
      });
    } catch (error) {
      res.status(401).send('Invalid refresh token');
    }
  }
}

const authController: IAuthController = new AuthController(authService);

export { IAuthController as AuthController, authController };
