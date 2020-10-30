import User, {IUser} from '@model/user';
import { Request, Response, NextFunction } from 'express';

let auth = (req:Request, res:Response, next:NextFunction) => {
    let token:string = req.cookies.x_auth;

    User.findByToken(token, (err:Error, user:IUser)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth : false,
            error: true
        });

        req.token = token;
        req.user = user;
        next();
    });
};

export { auth };