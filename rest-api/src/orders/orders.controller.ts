import { Request, Response } from "express";
import { OrderModel } from "./order.model";
import { Gif } from "../gifs/gif";

export const getOrders = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const orders = await OrderModel.find({user: userId});
    res.json(orders);
};

export const addOrder = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const gif: Gif = req.body.gif;
    const order = new OrderModel({
        user: userId,
        gif,
        status: 'pending',
    });
    await order.save();
    res.json(order);
};
