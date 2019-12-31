
import { Guard, textResult, Singleton } from "fortjs";
import { AppGLobal } from "../app_global";
import { SESSION } from "../enums/session";
import { UserService } from "../services/user_service";

export class TwitterVerifierGuard extends Guard {
    async check(@Singleton(UserService) userService: UserService) {
        const reqVerifer = this.query.oauth_verifier;
        await new Promise(async (res, rej) => {
            AppGLobal.twitterClient.getAccessToken(
                await this.session.get(SESSION.TwitterReqToken),
                await this.session.get(SESSION.TwitterReqSecret),
                reqVerifer,
                async (error, accessToken, accessTokenSecret, results) => {
                    if (error) {
                        this.logger.error('error', error);
                        rej(error);
                    } else {
                        await this.verifyUser(accessToken, accessTokenSecret, userService);
                        await this.session.setMany({
                            [SESSION.TwitterReqVerifier]: reqVerifer,
                            [SESSION.TwitterAccessToken]: accessToken,
                            [SESSION.TwitterAccessTokenSecret]: accessTokenSecret
                        });
                        res();
                    }
                });
        });
    }

    private verifyUser(accessToken, accessTokenSecret, userService) {
        return new Promise((res, rej) => {
            AppGLobal.twitterClient.verifyCredentials(accessToken, accessTokenSecret,
                {
                    include_email: true
                }, async (err, data) => {
                    if (err) {
                        this.logger.error(err);
                        rej(err);
                    } else {
                        const user = await userService.addUser({
                            name: data.name,
                            address: data.location,
                            twitter: {
                                id: data.id,
                                userName: data.screen_name,
                                tweets: []
                            }
                        } as any);
                        if (user && user._id) {
                            await this.session.set(SESSION.UserId, user._id);
                        }
                        res();
                    }
                });
        });
    }
}