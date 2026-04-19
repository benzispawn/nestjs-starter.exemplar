import { Inject, Injectable } from '@nestjs/common';
import {
  USERS_REPOSITORY,
  type UsersRepository,
} from '../ports/users.repository';
import { CreateUserInput } from '../dto/create-user.input';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { randomUUID } from 'node:crypto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly userRepository: UsersRepository,
  ) {}

  async execute(input: CreateUserInput) {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new UserAlreadyExistsError(input.email);
    }

    const user = new User(randomUUID(), input.name, input.email, new Date());

    await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
