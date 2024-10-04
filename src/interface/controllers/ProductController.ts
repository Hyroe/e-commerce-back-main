import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { ProductRequestDTO } from "@interface/dto/request/ProductRequestDTO";
import { ProductResponseDTO } from "@interface/dto/response/ProductResponseDTO";
import { ProductService } from "@infrastructure/services/ProductService";
import { getUserIdFromReq } from "@interface/helpers/getUserIdFromReq";
import { UserService } from "@infrastructure/services/UserService";

export class ProductController {
  private service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  //* http:post('/:id')

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dto = Object.assign(new ProductRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }

    const entity = await this.service.create(dto);
    const responseDto = ProductResponseDTO.fromRaw(entity);
    res.status(201).json({
      message: "Product created successfully",
      result: responseDto,
    });
  }

  //* http:get('/:id')

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const entity = await this.service.findById(parseInt(id));

    if (!entity) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const responseDto = ProductResponseDTO.fromRaw(entity);
    res.status(200).json({
      message: "Product retrieved successfully",
      result: responseDto,
    });
  }

  //* http:put('/:id')

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      res.status(400).json({ error: "Invalid product ID" });
      return;
    }

    const dto = Object.assign(new ProductRequestDTO(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }

    try {
      const updatedEntity = await this.service.update(productId, dto);

      if (!updatedEntity) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const responseDto = ProductResponseDTO.fromRaw(updatedEntity);
      res.status(200).json({
        message: "Product updated successfully",
        result: responseDto,
      });
    } catch (error) {
      next(error);
    }
  }

  //* http:delete('/:id')

  //* http:delete('/')
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      await this.service.delete(parseInt(id));
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      if (error instanceof Error && error.message === "Tag not found") {
        res.status(404).json({ message: "Product not found" });
      } else {
        next(error); // Pass any other errors to the error handling middleware
      }
    }
  }
  //* http:get('/')

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const entities = await this.service.findAll();
    const responseDtos = entities.map((entity) =>
      ProductResponseDTO.fromRaw(entity)
    );
    res.status(200).json({
      message: "All products retrieved successfully",
      result: responseDtos,
      error: "" // Add if necessary
    });
  }
}
