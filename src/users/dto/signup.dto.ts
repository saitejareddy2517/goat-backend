import { IsString, IsEmail, IsEnum, IsNotEmpty, Matches, IsOptional } from 'class-validator';
import { Role } from '../users.schema';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'userName must be alphanumeric' })
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
