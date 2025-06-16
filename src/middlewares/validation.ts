import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

interface IFormattedError {
  field: string;
  message: string;
  value?: any;
  location?: string;
}

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors: IFormattedError[] = errors
      .array()
      .map((error: ValidationError) => {
        const baseError: IFormattedError = {
          field: error.type === 'field' ? error.path : 'unknown',
          message: error.msg,
        };

        if (error.type === 'field') {
          baseError.value = error.value;
          baseError.location = error.location;
        }

        return baseError;
      });

    const groupedErrors = formattedErrors.reduce((acc, error) => {
      if (!acc[error.field]) {
        acc[error.field] = [];
      }
      acc[error.field].push(error.message);
      return acc;
    }, {} as Record<string, string[]>);

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
      groupedErrors,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  next();
};
