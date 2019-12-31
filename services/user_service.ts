import { IUser } from "../interfaces/user";
import { User } from "../db_schemas/user";

export class UserService {
    async addUser(user: IUser) {
        const isUserExist = await User.exists({ 'twitter.id': user.twitter.id })
        if (isUserExist === false) {
            const userInstance = new User(user);
            return await userInstance.save();
        }
        else {
            return await User.findOne({ 'twitter.id': user.twitter.id })
        }
    }
}