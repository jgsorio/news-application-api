import { NextFunction, Request, Response } from "express";
import { config } from 'dotenv';
import { verify } from 'jsonwebtoken';
config();

const Auth = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'Token not found!' });
    }

    verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: 'Invalid token!' });
        }

        req.headers.userEmail = decoded.email;

        return next();
    });
}

export default Auth;
