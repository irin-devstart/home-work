/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Controller, ClassMiddleware, ClassErrorMiddleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { CustomerService } from '../services';

@Controller('api/customer')
// @ClassMiddleware(Authentication.AUTHENTICATED)
// @ClassErrorMiddleware(globalErrorHandler)
export class CustomerController {
  @Get('')
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.getAllCustomers(req.query);
      return res.status(StatusCodes.OK).json(customer);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Get(':id')
  private async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await CustomerService.getOneCustomer(+id);
      return res.status(StatusCodes.OK).json(customer);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Post('')
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await CustomerService.createCustomer(req.body);
      return res.status(StatusCodes.OK).json(customer);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await CustomerService.editCustomer(+id, req.body);
      return res.status(StatusCodes.OK).json(customer);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Delete(':id')
  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await CustomerService.deleteCustomer(+id);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
