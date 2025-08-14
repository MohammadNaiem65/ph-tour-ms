import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';
import { IAuthProvider, IUser, Role } from './user.interface';
import { UserServices } from './user.service';

const getUsers = (req: Request, res: Response) => {
    res.send('getUsers');
};

const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    req.body.password = hashedPassword;
    const authProvider: IAuthProvider = {
        provider: 'credentials',
        providerId: req.body.email,
    };
    req.body.auths = [authProvider];
    req.body.role = Role.USER;

    const response = await UserServices.createUser(req.body);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'User created successfully.',
        data: response,
    });
});

export const UserControllers = { createUser, getUsers };
