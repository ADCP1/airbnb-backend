import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IPropertyService, propertyService } from '@application/services';
import { Request } from '@shared';

interface IPropertyController {
  create(
    req: Request<RequestDtos.CreatePropertyDto>,
  ): Promise<ResponseDtos.PropertyDto>;
  getMyProperties(req: Request<void>): Promise<ResponseDtos.PropertiesDto>;
  partialUpdate(
    req: Request<RequestDtos.UpdatePropertyDto>,
  ): Promise<ResponseDtos.PropertyDto>;
  get(
    req: Request<void, { propertyId: string }>,
  ): Promise<ResponseDtos.PropertyDto>;
  delete(
    req: Request<void, { propertyId: string }>,
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

  public async getMyProperties(
    req: Request<void>,
  ): Promise<ResponseDtos.PropertiesDto> {
    return this.propertyService.getMyProperties(req.user.email);
  }

  public async get(
    req: Request<void, { propertyId: string }>,
  ): Promise<ResponseDtos.PropertyDto> {
    return this.propertyService.getById(req.params.propertyId);
  }

  public async delete(
    req: Request<void, { propertyId: string }>,
  ): Promise<ResponseDtos.PropertyDto> {
    return this.propertyService.delete(req.params.propertyId, req.user.email);
  }
}

const propertyController: IPropertyController = new PropertyController(
  propertyService,
);

export { IPropertyController, propertyController };
