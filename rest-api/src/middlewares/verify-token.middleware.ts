import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../common/user.interface";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        dotenv.config();
    
        const secretKey = process.env.SECRET_KEY;
    
        if (!secretKey) {
          console.log('Secret key not set!');
          return;
        }
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded as IUser;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default verifyToken;