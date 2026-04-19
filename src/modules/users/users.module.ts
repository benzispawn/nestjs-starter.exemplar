import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { InMemoryUsersRepository } from './infra/persistence/repositories/in-memory-users.repository';
import { USERS_REPOSITORY } from './application/ports/users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    InMemoryUsersRepository,
    {
      provide: USERS_REPOSITORY,
      useExisting: InMemoryUsersRepository,
    },
  ],
})
export class UsersModule {}
