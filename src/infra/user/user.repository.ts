import { User, IUserRepository } from '@domain/user';
import { UserDoc } from './user.doc';

class UserRepository implements IUserRepository {
  public async save(user: User): Promise<User> {
    const filter = { email: user.email };
    return UserDoc.findOneAndUpdate(filter, user, {
      new: true,
      upsert: true,
    });
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await UserDoc.findOne({
      email,
    });
    if (!user) return undefined;
    return new User(user);
  }
}

export const userRepository: IUserRepository = new UserRepository();
