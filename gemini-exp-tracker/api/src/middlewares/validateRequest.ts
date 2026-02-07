import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError, ZodIssue } from "zod"; // Import ZodIssue

export const validate =
  (schema: ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: (error as ZodError).issues.map((err: ZodIssue) => ({ path: err.path, message: err.message })), // Explicitly cast error to ZodError
        });
      }
      next(error);
    }
  };

