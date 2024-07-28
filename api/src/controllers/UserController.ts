/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Controller, ClassMiddleware, ClassErrorMiddleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services';

@Controller('api/user')
// @ClassMiddleware(Authentication.AUTHENTICATED)
// @ClassErrorMiddleware(globalErrorHandler)
export class UserController {
  @Get('')
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await UserService.getAllUsers(req.query);
      return res.status(StatusCodes.OK).json(order);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Get(':id')
  private async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await UserService.getOneUser(+id);
      return res.status(StatusCodes.OK).json(order);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Post('')
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await UserService.createUser(req.body);
      return res.status(StatusCodes.OK).json(order);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Put(':id')
  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await UserService.editUser(+id, req.body);
      return res.status(StatusCodes.OK).json(order);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Delete(':id')
  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(+id);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
