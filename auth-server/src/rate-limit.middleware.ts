import { Request, Response, NextFunction } from "express";
import redis from './redis-client';
import dotenv from "dotenv";
const blockedIp = "blocked_ip";
const failedLogins = "failed_logins";

const blockIP = (ip: string) => {
    redis.client?.set(`${blockedIp}:${ip}`, 'blocked', { EX: 600 });
};
  
export const checkBlocked = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    // redis.client?.del(`${blockedIp}:${ip}`);
    const result = await redis.client?.get(`${blockedIp}:${ip}`);
    if (result) {
        return res.status(429)
            .json({ message: 'Too many failed attempts. Try again later.' });
    }
    next();        
};

export const addFailedAttempt = async (ip?: string) => {
    if (!ip) return;
    dotenv.config();
    
    const failedLoginWindowMinutes = +(process.env.FAILED_LOGIN_WINDOW_MINUTES ?? 10);

    const currentFailedTimestamp = Date.now();
    await redis.client?.rPush(`${failedLogins}:${ip}`, `${currentFailedTimestamp}`);

    const firstFailedTimeStamp = await redis.client?.lRange(`${failedLogins}:${ip}`, 0, 0);
    if (currentFailedTimestamp - (+firstFailedTimeStamp!) > failedLoginWindowMinutes * 60 * 1000) {
        await redis.client?.lPop(`${failedLogins}:${ip}`);
    }
    const numberOfFailedAttempts = await redis.client?.lLen(`${failedLogins}:${ip}`) ?? 0;
    
    if (numberOfFailedAttempts >= 10) {
        blockIP(ip);
        await redis.client?.del(`${failedLogins}:${ip}`);
    }
};

