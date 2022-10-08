import { Request } from '@shared';
import { IAuthService, authService } from '@services';
import { CreateTokenDto, TokenDto } from './dtos';

interface IAuthController {
  generateNewToken(req: Request<CreateTokenDto>): Promise<TokenDto>;
}

class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  public async generateNewToken(
    req: Request<CreateTokenDto>,
  ): Promise<TokenDto> {
    return {
      token: await this.authService.generateJWT(req.body.refreshToken),
    };
  }
}

const authController: IAuthController = new AuthController(authService);

export { IAuthController as AuthController, authController };
