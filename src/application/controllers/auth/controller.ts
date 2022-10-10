import { authService, IAuthService } from 'application';
import { RequestDtos, ResponseDtos } from 'application/dtos';
import { Request } from '@shared';

interface IAuthController {
  generateNewToken(
    req: Request<RequestDtos.CreateTokenDto>,
  ): Promise<ResponseDtos.TokenDto>;
}

class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  public async generateNewToken(
    req: Request<RequestDtos.CreateTokenDto>,
  ): Promise<ResponseDtos.TokenDto> {
    return {
      token: await this.authService.generateJWT(req.body.refreshToken),
    };
  }
}

const authController: IAuthController = new AuthController(authService);

export { IAuthController as AuthController, authController };
