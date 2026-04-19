import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from '../../application/dto/create-user.input';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserOutput } from '../../application/dto/create-user.output';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserInput): Promise<CreateUserOutput> {
    return await this.createUserUseCase.execute(body);
  }
}
