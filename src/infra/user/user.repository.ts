import { CreditCardInfo, IUserRepository, User } from '@domain/user';
import { loadObjectIdentification } from '@infra/identification';
import cloneDeep from 'clone-deep';

import { UserDoc } from './user.doc';

class UserRepository implements IUserRepository {
  public async save(user: User) {
    loadObjectIdentification(user);
    await UserDoc.updateOne(
      { email: user.email },
      { $set: cloneDeep({ ...user }) },
      { upsert: true },
    );
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const user = await UserDoc.findOne({
      email,
    });
    if (!user) return null;
    return new User({
      id: user.id,
      ...user.toObject(),
    });
  }

  public async findOneById(id: string): Promise<User | null> {
    const user = await UserDoc.findById(id).lean();
    if (!user) return null;
    return new User({
      id,
      ...user,
      creditCardInfo: user.creditCardInfo
        ? new CreditCardInfo({
            ...user.creditCardInfo,
          })
        : undefined,
    });
  }
}

export const userRepository: IUserRepository = new UserRepository();
