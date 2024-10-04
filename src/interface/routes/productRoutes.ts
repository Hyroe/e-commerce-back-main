import { Router } from "express";
import { ProductController } from "@interface/controllers/ProductController";
import { ProductService } from "@infrastructure/services/ProductService";
import { asyncHandler, requireAuth } from "@interface/middleware";
import { AsyncRequestHandler } from "src/types/asyncRequestHandler";

const router = Router();
const service = new ProductService();
const controller = new ProductController(service);

router.get(
  "/", 
  asyncHandler(controller.findAll.bind(controller) as AsyncRequestHandler)
);
router.get(
  "/:id",
  asyncHandler(controller.find.bind(controller) as AsyncRequestHandler)
);
router.put(
  "/:id", requireAuth,
  asyncHandler(controller.update.bind(controller) as AsyncRequestHandler)
);

router.post(
  "/", requireAuth,
  asyncHandler(controller.create.bind(controller) as AsyncRequestHandler)
);
router.delete(
  "/:id",
  asyncHandler(controller.delete.bind(controller) as AsyncRequestHandler)
);
export { router as productRoutes };
