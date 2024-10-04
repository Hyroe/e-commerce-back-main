import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

export const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
