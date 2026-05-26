import bcrypt from 'bcrypt';

import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../utils/jwt';
import { ApiError } from '../utils/api-error';

const userRepository = new UserRepository();

export class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError('Invalid credentials', 401);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const sanitizedUser = {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
    };

    return {
        token,
        user: sanitizedUser,
    };
  }

  async currentUser(userId: string) {
    const user = await userRepository.findByIdSafe(userId);

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    return user;
  }
}