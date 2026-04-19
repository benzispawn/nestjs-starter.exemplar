import { UsersRepository } from '../../../../../../src/modules/users/application/ports/users.repository';
import { CreateUserUseCase } from '../../../../../../src/modules/users/application/use-cases/create-user.use-case';
import { User } from '../../../../../../src/modules/users/domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../../../../../src/modules/users/domain/errors/user-already-exists.error';

class UsersRepositoryStub implements UsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return await Promise.resolve(
      this.users.find((user) => user.email === email) ?? null,
    );
  }

  async create(user: User): Promise<void> {
    await Promise.resolve(this.users.push(user));
  }
}

describe('CreateUserUseCase', () => {
  let repository: UsersRepositoryStub;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    repository = new UsersRepositoryStub();
    useCase = new CreateUserUseCase(repository);
  });

  it('should create a user successfully', async () => {
    const output = await useCase.execute({
      name: 'Raphael',
      email: 'raphael@example.com',
    });

    expect(output.id).toBeDefined();
    expect(output.name).toBe('Raphael');
    expect(output.email).toBe('raphael@example.com');
    expect(output.createdAt).toBeDefined();
  });

  it('should throw when user already exists', async () => {
    await useCase.execute({
      name: 'Raphael',
      email: 'raphael@example.com',
    });

    await expect(
      useCase.execute({
        name: 'Outro Raphael',
        email: 'raphael@example.com',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
