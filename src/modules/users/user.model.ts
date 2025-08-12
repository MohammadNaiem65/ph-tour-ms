import { model, Schema } from 'mongoose';
import {
    AuthProviders,
    IAuthProvider,
    IsActive,
    IUser,
    Role,
} from './user.interface';

const authProviderSchema = new Schema<IAuthProvider>(
    {
        provider: {
            type: String,
            enum: Object.values(AuthProviders),
            required: true,
        },
        providerId: {
            type: String,
            required: true,
        },
    },
    { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        picture: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: String,
            enum: Object.values(IsActive),
            default: IsActive.ACTIVE,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER,
        },
        auths: {
            type: [authProviderSchema],
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;
