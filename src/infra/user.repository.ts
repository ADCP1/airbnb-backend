import { User, IUserRepository } from '@domain/user';

// TODO this is an in-memory implementation, we should replace this with a Mongo or SQL one

class UserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [
      new User({ username: 'mark', password: 'foo' }),
      new User({ username: 'lio', password: 'foo' }),
      new User({ username: 'dani', password: 'foo' }),
      new User({ username: 'kiki', password: 'foo' }),
      new User({ username: 'gonza', password: 'foo' }),
      new User({ username: 'hugo', password: 'foo' }),
    ];
  }

  public save(user: User) {
    if (!this.findOneByUsername(user.username)) {
      this.users.push(user);
    } else {
      throw new Error('A user with that username already exists');
    }
  }

  public findOneByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}

export const userRepository: IUserRepository = new UserRepository();
