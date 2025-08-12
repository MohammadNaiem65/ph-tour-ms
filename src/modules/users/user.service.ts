import { StatusCodes } from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (payload: Partial<IUser>) => {
    const doesExists = await User.exists({ email: payload.email });

    if (doesExists) {
        throw new AppError(StatusCodes.CONFLICT, 'User already exists');
    }

    const user = await User.create(payload);

    return user;
};

const UserServices = {
    createUser,
};

export default UserServices;
