import { RequestDtos, ResponseDtos } from '@application/dtos';
import { IPropertyRepository, Property } from '@domain/property';
import { User } from '@domain/user';
import { propertyRepository } from '@infra/property';
import { DomainException, NotFoundException } from '@shared';

import { PropertyFactory } from './property.factory';
import { IUserService, userService } from './user.service';

interface IPropertyService {
  create(
    propertyDto: RequestDtos.CreatePropertyDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.PropertyDto>;
  partialUpdate(
    propertyId: string,
    propertyDto: RequestDtos.UpdatePropertyDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.PropertyDto>;
  getById(propertyId: string): Promise<ResponseDtos.PropertyDto>;
  searchByText(searchText: string): Promise<ResponseDtos.PropertyDto[]>;
  getMyProperties(ownerEmail: string): Promise<ResponseDtos.PropertiesDto>;
  getPreview(): Promise<ResponseDtos.PropertyDto[]>;
  delete(propertyId: string, ownerEmail: string): Promise<void>;
}

class PropertyService implements IPropertyService {
  private propertyRepository: IPropertyRepository;
  private userService: IUserService;

  constructor(
    propertyRepository: IPropertyRepository,
    userService: IUserService,
  ) {
    this.propertyRepository = propertyRepository;
    this.userService = userService;
  }

  public async create(
    propertyDto: RequestDtos.CreatePropertyDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.PropertyDto> {
    const owner = await this.getOwnerFromEmail(ownerEmail);
    const property = new Property({
      ...propertyDto,
      ownerId: owner.id!,
    });
    await this.propertyRepository.save(property);
    return PropertyFactory.toDto(property);
  }

  public async partialUpdate(
    propertyId: string,
    propertyDto: RequestDtos.UpdatePropertyDto,
    ownerEmail: string,
  ): Promise<ResponseDtos.PropertyDto> {
    const owner = await this.getOwnerFromEmail(ownerEmail);
    const property = await this.propertyRepository.findById(propertyId);
    if (!property) {
      throw new NotFoundException('Property does not exist');
    }
    if (owner.id !== property.ownerId) {
      throw new DomainException('Property does not belong to the user');
    }
    const updatedProperty = new Property({
      ...property,
      ...propertyDto,
    });
    await this.propertyRepository.save(updatedProperty);
    return PropertyFactory.toDto(property);
  }

  public async getById(propertyId: string): Promise<ResponseDtos.PropertyDto> {
    const property = await this.propertyRepository.findById(propertyId);
    if (!property) {
      throw new NotFoundException('Property does not exist');
    }
    return PropertyFactory.toDto(property);
  }

  public async searchByText(
    searchText: string,
  ): Promise<ResponseDtos.PropertyDto[]> {
    const properties = await this.propertyRepository.findManyByText(searchText);
    return properties.map((property) => PropertyFactory.toDto(property));
  }

  private async getOwnerFromEmail(email: string): Promise<User> {
    const owner = await this.userService.findFromEmail(email);
    if (!owner) {
      throw new NotFoundException('User creating the property does not exist');
    }
    return owner;
  }

  public async getMyProperties(
    ownerEmail: string,
  ): Promise<ResponseDtos.PropertiesDto> {
    const owner = await this.getOwnerFromEmail(ownerEmail);
    const properties = await this.propertyRepository.findByOwnerId(owner.id!);
    return {
      properties: properties.map((property) => PropertyFactory.toDto(property)),
    };
  }

  public async getPreview(): Promise<ResponseDtos.PropertyDto[]> {
    const maxPreviewPropertyAmount = 20;
    const properties = await this.propertyRepository.findMany(
      maxPreviewPropertyAmount,
    );
    return properties.map((property) => PropertyFactory.toDto(property));
  }

  public async delete(propertyId: string, ownerEmail: string): Promise<void> {
    const owner = await this.getOwnerFromEmail(ownerEmail);
    const property = await this.propertyRepository.findById(propertyId);
    if (!property) {
      throw new NotFoundException('Property does not exist');
    }
    if (owner.id !== property.ownerId) {
      throw new DomainException('Property does not belong to the user');
    }
    await this.propertyRepository.deleteById(propertyId);
  }
}

const propertyService: IPropertyService = new PropertyService(
  propertyRepository,
  userService,
);

export { IPropertyService, propertyService };
