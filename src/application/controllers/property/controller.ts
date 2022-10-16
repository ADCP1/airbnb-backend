import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IPropertyService, propertyService } from '@application/services';
import { Request } from '@shared';

interface IPropertyController {
  create(
    req: Request<RequestDtos.CreatePropertyDto>,
  ): Promise<ResponseDtos.PropertyDto>;
  partialUpdate(
    req: Request<RequestDtos.UpdatePropertyDto>,
  ): Promise<ResponseDtos.PropertyDto>;
}

class PropertyController implements IPropertyController {
  private propertyService: IPropertyService;

  constructor(propertyService: IPropertyService) {
    this.propertyService = propertyService;
  }

  public async create(
    req: Request<RequestDtos.CreatePropertyDto>,
  ): Promise<ResponseDtos.PropertyDto> {
    return this.propertyService.create(req.body, req.user.email);
  }

  public async partialUpdate(
    req: Request<RequestDtos.UpdatePropertyDto, { propertyId: string }>,
  ): Promise<ResponseDtos.PropertyDto> {
    return this.propertyService.partialUpdate(
      req.params.propertyId,
      req.body,
      req.user.email,
    );
  }
}

const propertyController: IPropertyController = new PropertyController(
  propertyService,
);

export { IPropertyController, propertyController };
