/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Controller, ClassMiddleware, ClassErrorMiddleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { AuthService, CustomerService, UserService } from '../services';
import { User } from '@prisma/client';

@Controller('api/')
// @ClassMiddleware(Authentication.AUTHENTICATED)
// @ClassErrorMiddleware(globalErrorHandler)
export class AuthController {
  @Post('login')
  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtid: string = uuidv4();
      const { email, password } = req.body;
      const user = await AuthService.verifyUserCredentials(email, password);
      delete user.password;
      return res.status(StatusCodes.OK).json({
        token: AuthService.generateUserJwt(user.id, jwtid),
        user
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  @Post('logout')
  private async logout(req: Request, res: Response, next: NextFunction) {
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
