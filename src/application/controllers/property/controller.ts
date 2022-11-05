import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IPropertyService, propertyService } from '@application/services';
import { Request } from '@shared';

interface IPropertyController {
  create(
    req: Request<RequestDtos.CreatePropertyDto>,
  ): Promise<ResponseDtos.PropertyDto>;
  getUserProperties(req: Request<void>): Promise<ResponseDtos.PropertiesDto>;
  partialUpdate(
    req: Request<RequestDtos.UpdatePropertyDto>,
  ): Promise<ResponseDtos.PropertyDto>;
  get(
    req: Request<void, { propertyId: string }>,
  ): Promise<ResponseDtos.PropertyDto>;
  searchByText(
    req: Request<void, any, { searchText: string }>,
  ): Promise<ResponseDtos.PropertyDto[]>;
  delete(req: Request<void, { propertyId: string }>): Promise<void>;
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

  public async getUserProperties(
    req: Request<void>,
  ): Promise<ResponseDtos.PropertiesDto> {
    return this.propertyService.getMyProperties(req.user.email);
  }

  public async get(
    req: Request<void, { propertyId: string }>,
  ): Promise<ResponseDtos.PropertyDto> {
    return this.propertyService.getById(req.params.propertyId);
  }

  public async searchByText(
    req: Request<void, any, { searchText: string }>,
  ): Promise<ResponseDtos.PropertyDto[]> {
    return this.propertyService.searchByText(req.query.searchText);
  }

  public async delete(
    req: Request<void, { propertyId: string }>,
  ): Promise<void> {
    return this.propertyService.delete(req.params.propertyId, req.user.email);
  }
}

const propertyController: IPropertyController = new PropertyController(
  propertyService,
);

export { IPropertyController, propertyController };
