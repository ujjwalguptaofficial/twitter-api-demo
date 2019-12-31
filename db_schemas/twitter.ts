import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user";

const schemaObj = new Schema({
    userId: {},
    id: {},
    text: {},
    entities: {},
    user: {},
    place: {}
});

export const Tweets = model('Tweets', schemaObj);