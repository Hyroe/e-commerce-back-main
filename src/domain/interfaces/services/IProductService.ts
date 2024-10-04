import { ProductRequestDTO } from '@interface/dto/request/ProductRequestDTO';
import { Product } from '@domain/entities/Product';

export interface IProductService {
  create(data: Partial<ProductRequestDTO>): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]> ;
  update(id: number, data: Partial<ProductRequestDTO>): Promise<Product>;
  delete(id: number): Promise<void>;
  // Add other methods as needed, such as findAll, count, etc.
}
