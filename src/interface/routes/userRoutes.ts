import { Router } from "express";

import { UserController } from "@interface/controllers/UserController";
import { UserService } from "@infrastructure/services/UserService";
import { asyncHandler } from "@interface/middleware";

import { AsyncRequestHandler } from "src/types/asyncRequestHandler";

const router = Router();
const service = new UserService();
const controller = new UserController(service);

router.get(
  "/",
  asyncHandler(controller.findAll.bind(controller) as AsyncRequestHandler)
);
router.get(
  "/:id",
  asyncHandler(controller.find.bind(controller) as AsyncRequestHandler)
);
router.get(
  "/email/:email",
  asyncHandler(controller.findByEmail.bind(controller) as AsyncRequestHandler)
);
router.post(
  "/signUp",
  asyncHandler(controller.signUp.bind(controller) as AsyncRequestHandler)
);

router.post(
  "/signIn",
  asyncHandler(controller.signIn.bind(controller) as AsyncRequestHandler)
);
router.post(
  "/",
  asyncHandler(controller.create.bind(controller) as AsyncRequestHandler)
);

export { router as userRoutes };
