import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class ProductRequestDTO {
  /**
   * Name field with validation. This field is required.
   */
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name!: string;
  
  
  @IsNotEmpty({ message: 'Image is required.' })
  @IsString({ message: 'Image must be a string.' })
  imageUrl!: string;

  /**
   * Optional description field with validation if provided.
   */
  @IsOptional()
  @IsString({ message: 'Description must be a string if provided.' })
  description?: string;

  /**
   * Price field with validation. This field is required.
   */
  @IsNotEmpty({ message: 'Price is required and cannot be empty.' })
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0, { message: 'Price must be at least 0.' })
  @Max(100000000000, { message: 'Price cannot exceed 100000000000.' })
  price!: number;

  /**
   * Stock field with validation. This field is required.
   */
  @IsNotEmpty({ message: 'Stock is required and cannot be empty.' })
  @IsNumber({}, { message: 'Stock must be a number.' })
  stock!: number;

}
