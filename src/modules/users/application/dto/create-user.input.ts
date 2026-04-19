import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserInput {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;
}
