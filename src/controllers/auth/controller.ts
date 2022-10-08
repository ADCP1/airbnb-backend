import { Request, Response } from '@shared';
import { AuthService, authService } from '@services';

interface AuthController {
  generateNewToken(rq: Request, res: Response): void;
}

class CAuthController implements AuthController {
  private authService: AuthService;

  constructor() {
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

const authController: AuthController = new CAuthController();

export { AuthController, authController };
