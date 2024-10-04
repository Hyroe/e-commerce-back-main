import { UserRequestDTO } from "@interface/dto/request/UserRequestDTO";
import { User } from "@domain/entities/User";
import { LoginRequestDTO } from "@interface/dto/request/LoginRequestDTO";

export interface IUserService {
  create(data: Partial<UserRequestDTO>): Promise<User>;
  
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  
  signUp(data: Partial<UserRequestDTO>): Promise<User>;
  signIn(data: LoginRequestDTO): Promise<User>;

  update(id: number, data: Partial<UserRequestDTO>): Promise<User>;
  delete(id: number): Promise<void>;
  // Add other methods as needed, such as findAll, count, etc.
}
