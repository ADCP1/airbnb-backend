import { User, IUserRepository } from '@domain/user';
import { UserDoc } from './user.doc';

class UserRepository implements IUserRepository {
  public async save(user: User) {
    if (!(await this.findOneByUsername(user.username))) {
      await new UserDoc({ ...user }).save();
    } else {
      throw new Error('A user with that username already exists');
    }
  }

  public async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await UserDoc.findOne({
      username,
    });
    if (!user) return undefined;
    return new User({
      username: user.username,
      password: user.password,
    });
  }
}

export const userRepository: IUserRepository = new UserRepository();
