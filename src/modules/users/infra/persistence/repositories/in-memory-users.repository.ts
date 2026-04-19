import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import type { UsersRepository } from '../../../application/ports/users.repository';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  private readonly users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email);
    return await Promise.resolve(user ?? null);
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
    return await Promise.resolve();
  }
}
