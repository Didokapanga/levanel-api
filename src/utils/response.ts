import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any = null,
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = 'Internal server error',
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};