import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user";

const schemaObj = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    gender: { type: String },
    emailId: { type: String },
    password: { type: String },
    twitter: {}
});

export const User = model<IUser>('User', schemaObj);