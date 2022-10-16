import { IPropertyRepository, Property } from '@domain/property';

import { PropertyDoc } from './property.doc';

class PropertyRepository implements IPropertyRepository {
  public async save(user: User) {
    await UserDoc.updateOne(
      { email: user.email },
      { $set: user },
      { upsert: true },
    );
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await UserDoc.findOne({
      email,
    });
    if (!user) return undefined;
    return new User(user.toObject());
  }
}

export const userRepository: IUserRepository = new PropertyRepository();
