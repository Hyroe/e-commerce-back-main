import { PrismaClient, Prisma } from "@prisma/client";
import { IUserService } from "@domain/interfaces/services/IUserService";
import { User } from "@domain/entities/User";
import { UserRequestDTO } from "@interface/dto/request/UserRequestDTO";
import { LoginRequestDTO } from "@interface/dto/request/LoginRequestDTO";

import bcrypt from "bcrypt";

export class UserService implements IUserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<UserRequestDTO>): Promise<User> {
    const entity = User.create({
      name: data.name,
      email: data.email,
      // Add other properties as needed
    });

    const emailExists = await this.findByEmail(entity.email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    const createdEntity = await this.prisma.user.create({
      data: entity,
    });

    return User.create(createdEntity);
  }

  async signUp(data: Partial<UserRequestDTO>): Promise<User> {
    const encryptedPassword = await bcrypt.hash(data.password as string, 10);
    const entity = User.create({
      name: data.name,
      email: data.email,
      password: encryptedPassword
    });

    const emailExists = await this.findByEmail(entity.email);

    if (emailExists) {
      throw new Error("Email already exists");
    }

    const createdEntity = await this.prisma.user.create({
      data: entity,
    });

    return User.create(createdEntity);
  }

  async signIn(data:LoginRequestDTO): Promise<User> {
    const user = await this.findByEmail(data.email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    //Desencriptar y comparar contraseña
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }

    return user;
  }

  async findById(id: number): Promise<User | null> {
    const model = await this.prisma.user.findUnique({
      where: { id },
    });
    return model ? User.create(model) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await this.prisma.user.findUnique({
      where: { email },
    });
    return model ? User.create(model) : null;
  }

  async update(id: number, data: Partial<UserRequestDTO>): Promise<User> {
    const updatedEntity = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return User.create(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    const models = await this.prisma.user.findMany();
    return models.map((model) => User.create(model));
  }
}
