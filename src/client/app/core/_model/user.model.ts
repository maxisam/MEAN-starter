export interface IUser {
    readonly account: string;
    readonly password: string;
}

export interface IUserState {
    account?: string;
    role?: string;
    expiredAt?: string;
    token?: string;
}

