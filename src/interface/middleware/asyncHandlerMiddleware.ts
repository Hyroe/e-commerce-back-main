import { Request, Response, NextFunction } from "express";
import { AsyncRequestHandler } from "src/types/asyncRequestHandler";

const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { asyncHandler };
