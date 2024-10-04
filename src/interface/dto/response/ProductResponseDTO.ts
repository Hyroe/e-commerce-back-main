import { Expose, plainToClass } from 'class-transformer';

export class ProductResponseDTO {
  @Expose()
  name!: string;
  @Expose()
  id!: number;
  @Expose()
  description!: string;
  @Expose()
  imageUrl!: string; 
  @Expose()
  price!: number;
  @Expose()
  stock!: number;

  // Method to transform plain object into ProductResponseDTO instance
  static fromRaw(rawData: object): ProductResponseDTO {
    return plainToClass(ProductResponseDTO, rawData, {
      excludeExtraneousValues: true,
    });
  }

  // Add other fields and transformation logic as needed
}
