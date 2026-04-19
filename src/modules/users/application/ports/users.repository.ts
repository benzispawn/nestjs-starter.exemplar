import { User } from '../../domain/entities/user.entity';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
