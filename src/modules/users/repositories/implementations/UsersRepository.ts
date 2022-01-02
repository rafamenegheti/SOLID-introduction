import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User({ name, email });

    this.users.push(user);
    return user;
  }

  findById(user_id: string): User | undefined {
    const user = this.users.find((user) => {
      return user.id === user_id;
    });
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => {
      return user.email === email;
    });
    return user;
  }

  turnAdmin(receivedUser: User): User {
    const user = this.findById(receivedUser.id);
    user.admin = true;
    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
