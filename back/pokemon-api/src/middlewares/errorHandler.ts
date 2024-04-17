import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types/customError';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.customMessage || "Ocorreu um erro inesperado!";
    res.status(status).send({ error: message });
  };