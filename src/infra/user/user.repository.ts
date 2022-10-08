import { User, IUserRepository } from '@domain/user';
import { DomainException } from '@shared';
import { UserDoc } from './user.doc';

class UserRepository implements IUserRepository {
  public async save(user: User) {
    const userAlreadyExists =
      (await this.findOneByUsername(user.username)) !== undefined;
    if (!userAlreadyExists) {
      await new UserDoc({ ...user }).save();
    } else {
      throw new DomainException('A user with that username already exists');
    }
  }

  public async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await UserDoc.findOne({
      username,
    });
    if (!user) return undefined;
    return new User({
      id: user.id,
      username: user.username,
      password: user.password,
    });
  }
}

export const userRepository: IUserRepository = new UserRepository();
