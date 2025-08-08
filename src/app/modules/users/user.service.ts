import { StatusCodes } from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: Partial<IUser>) => {
    const { email } = payload;

    const isUserExists = await User.existsByEmail(email as string);

    if (isUserExists) {
        throw new AppError(StatusCodes.CONFLICT, 'User already exists.');
    }
    const user = await User.create(payload);

    return user;
};

export const UserServices = { createUser };
