import { IUserRepository, User } from '@domain/user';

import { UserDoc } from './user.doc';

class UserRepository implements IUserRepository {
  public async save(user: User) {
    await UserDoc.updateOne(
      { email: user.email },
      { $set: user },
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
}

export const userRepository: IUserRepository = new UserRepository();
