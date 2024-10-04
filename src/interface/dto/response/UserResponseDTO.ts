import { Expose, plainToClass } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  name!: string;
  
  @Expose()
  email!: string;
  
  @Expose()
  id!: number;

  // Method to transform plain object into UserResponseDTO instance
  static fromRaw(rawData: object): UserResponseDTO {
    return plainToClass(UserResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
