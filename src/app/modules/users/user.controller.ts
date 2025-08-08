import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';
import { IUser } from './user.interface';
import { UserServices } from './user.service';

const getUsers = (req: Request, res: Response) => {
    res.send('getUsers');
};

const createUser = asyncHandler(async (req: Request, res: Response) => {
    const response = await UserServices.createUser(req.body);

    sendResponse<IUser>(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'User created successfully.',
        data: response,
    });

    // res.status(StatusCodes.CREATED).json({
    //     message: 'User created successfully.',
    //     data: response,
    // });
});

// const createUser = async (req: Request, res: Response) => {
//     try {
//         const { name, email } = req.body;

//         const data = { name, email };

//         const response = await UserServices.createUser(data);

//         res.status(StatusCodes.CREATED).json({
//             message: 'User created successfully.',
//             data: response,
//         });
//     } catch (error: any) {
//         console.log('🚀 ~ createUser ~ error:', error);
//         res.status(StatusCodes.BAD_REQUEST).json({
//             message: error.message,
//             error: error,
//         });
//     }
// };

export const UserControllers = { createUser, getUsers };
