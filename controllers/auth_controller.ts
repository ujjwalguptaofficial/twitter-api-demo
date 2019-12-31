
import { Controller, Worker, Route, redirectResult, Singleton, Guards } from "fortjs";
import { SESSION } from "../enums/session";
import { AppGLobal } from "../app_global";
import { TwitterVerifierGuard } from "../guards/twitter_verifier_guard";
import { TweetFetcherGuard } from "../guards/tweet_fetcher_guard";

export class AuthController extends Controller {

    @Worker()
    async twitter() {
        const requestTokens: any = await new Promise((res, rej) => {
            AppGLobal.twitterClient.getRequestToken((error, requestToken, requestTokenSecret) => {
                if (error) {
                    this.logger.error(error);
                    rej(error);
                } else {
                    res({
                        token: requestToken,
                        secret: requestTokenSecret
                    });
                }
            });
        });
        await this.session.setMany({
            [SESSION.TwitterReqToken]: requestTokens.token,
            [SESSION.TwitterReqSecret]: requestTokens.secret
        });
        return redirectResult(`https://twitter.com/oauth/authenticate?oauth_token=${requestTokens.token}`);
    }

    @Worker()
    @Route('/twitter/callback')
    @Guards([TwitterVerifierGuard, TweetFetcherGuard])
    async twitterCallback() {
        return redirectResult("/");
    }


}