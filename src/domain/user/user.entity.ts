export type UserArgs = {
  username: string;
  password: string;
};

export class User {
  public username: string;
  public password: string;

  constructor(args: UserArgs) {
    this.username = args.username;
    this.password = args.password;
  }
}
