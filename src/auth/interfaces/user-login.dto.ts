import { IsString } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
