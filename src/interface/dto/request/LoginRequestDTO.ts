import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class LoginRequestDTO {
  // Optional name field with validation if provided
  @IsNotEmpty()
  @IsString({ message: "Name must be a string if provided." })
  name!: string;

  @IsNotEmpty()
  @IsString({ message: "Password must be a string if provided." })
  password!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

}
