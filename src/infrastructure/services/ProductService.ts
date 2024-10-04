import { PrismaClient } from "@prisma/client";
import { IProductService } from "@domain/interfaces/services/IProductService";
import { Product } from "@domain/entities/Product";
import { ProductRequestDTO } from "@interface/dto/request/ProductRequestDTO";

export class ProductService implements IProductService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Creates a new product.
   *
   * @param data - Data for the product to be created.
   * @returns The created `Product` entity.
   */
  async create(data: ProductRequestDTO): Promise<Product> {
    const entity = Product.create({
      name: data.name,
      imageUrl: data.imageUrl,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
    });

    const createdEntity = await this.prisma.product.create({
      data: {
        ...entity,
      },
    });

    return Product.create({
      ...createdEntity,
    });
  }

  /**
   * Finds a product by its ID.
   *
   * @param id - The ID of the product to find.
   * @returns The found product or `null` if it doesn't exist.
   */
  async findById(id: number): Promise<Product | null> {
    const model = await this.prisma.product.findUnique({
      where: { id },
    });

    return model
      ? Product.create({
          ...model,
        })
      : null;
  }

  /**
   * Updates an existing product with the new data provided.
   *
   * @param id - The ID of the product to update.
   * @param data - The data to update.
   * @returns The updated `Product` entity.
   */
  async update(id: number, data: ProductRequestDTO): Promise<Product> {
    const entity = Product.create({
      imageUrl: data.imageUrl,
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
    });

    const updatedEntity = await this.prisma.product.update({
      where: { id },
      data: {
        ...entity,
      },
    });

    return Product.create({
      ...updatedEntity,
    });
  }

  /**
   * Deletes a product by its ID.
   *
   * @param id - The ID of the product to delete.
   */
  async delete(id: number): Promise<void> {
    if (!(await this.findById(id))) {
      throw new Error('Product not found');
    }
    await this.prisma.product.delete({
      where: { id },
    });
  }

  /**
   * Retrieves all available products.
   *
   * @returns An array of products.
   */
  async findAll(): Promise<Product[]> {
    const models = await this.prisma.product.findMany();

    return models.map((model) =>
      Product.create({
        ...model,
      })
    );
  }
}
