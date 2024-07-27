/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import {
  Controller,
  ClassMiddleware,
  ClassErrorMiddleware,
  Get,
  Put,
  Post,
  Delete
} from '@overnightjs/core';
import status from 'http-status-codes';

@Controller('api/product')
// @ClassMiddleware(Authentication.AUTHENTICATED)
// @ClassErrorMiddleware(globalErrorHandler)
export class ProductController {
  @Get('')
  private async getAll(req: Request, res: Response, next: NextFunction) {
    return res.status(status.ACCEPTED).json({
      message: 'Beros'
    });
  }

  @Get(':id')
  private async getOne(req: Request, res: Response, next: NextFunction) {}

  @Post('')
  private async create(req: Request, res: Response, next: NextFunction) {}

  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {}

  @Delete(':id')
  private async delete(req: Request, res: Response, next: NextFunction) {}
}
