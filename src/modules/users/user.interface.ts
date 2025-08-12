// name, email, password, phone, picture, address, isDeleted, isActive, isVerified, role, auths, bookings, guides

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
    SUPER_ADMIN = 'super-admin',
}

export enum IsActive {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BLOCKED = 'blocked',
}

export enum AuthProviders {
    CREDENTIALS = 'credentials',
    GOOGLE = 'google',
}

export interface IAuthProvider {
    provider: AuthProviders;
    providerId: string;
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[];
}
