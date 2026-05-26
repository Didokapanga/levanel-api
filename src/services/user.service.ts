import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { sanitizeUser } from '../utils/user-sanitizer';

const userRepository = new UserRepository();

export class UserService {
  async createUser(data: any, actorId: string) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    },
    actorId
  );

    return sanitizeUser(user);
  }

  async updateUser(
  id: string,
  data: any,
  actorId: string
  ) 
  {

    if (data.password) {
      data.password = await bcrypt.hash(
        data.password,
        10
      );
    }

    const user = await userRepository.update(
      id,
      data,
      actorId
    );

    return sanitizeUser(user);
  }

  async getUsers() {
    const users = await userRepository.findAllUsers();
    return users.map(sanitizeUser);
  }

  async deleteUser(
    id: string,
    actorId: string
  ) {

    await userRepository.softDelete(
      id,
      actorId
    );

    return;
  }
}