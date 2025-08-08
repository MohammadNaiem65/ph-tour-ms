import { model, Schema } from 'mongoose';
import {
    IAuthProvider,
    IsActive,
    IUser,
    Role,
    UserModelType,
} from './user.interface';

const authProviderSchema = new Schema<IAuthProvider>(
    {
        provider: {
            type: String,
            required: true,
        },
        providerId: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
        versionKey: false,
    }
);

const userSchema = new Schema<IUser, UserModelType>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        picture: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
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
    {
        timestamps: true,
        versionKey: false,
        // statics: {
        //     existsByEmail: function (email: string) {
        //         return this.exists({ email: new RegExp(email.trim(), 'i') });
        //     },
        // },
    }
);

// /**
//  * Checks if a user exists in the database with the given email.
//  *
//  * @param {string} email - The email to search for.
//  * @returns {Promise<boolean>} - true if a user with the given email exists, false otherwise.
//  */
userSchema.statics.existsByEmail = async function (
    email: string
): Promise<boolean> {
    const user = await this.exists({
        email: new RegExp(email.trim(), 'i'),
    });

    return !!user;
};

const User = model<IUser, UserModelType>('User', userSchema);

export default User;
