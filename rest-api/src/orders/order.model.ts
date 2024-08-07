import mongoose, { Schema } from "mongoose";

const gifSchema = new Schema({
    id: String,
    url: String,
    title: String,
    images: {
        original: {
          url: String,
        },
    },
});

export const OrderModel = mongoose.model(
    'Order',
    new Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        gif: gifSchema,
        status: String,
    },
    {
        timestamps: true
    })
);