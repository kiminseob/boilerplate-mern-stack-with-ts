import { IUser } from "@model/user";

declare module 'express-serve-static-core' {
    export interface Request {
        token: string;
        user: IUser;
    }
}