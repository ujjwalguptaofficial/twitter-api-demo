
import { Guard, textResult, Singleton } from "fortjs";
import { AppGLobal } from "../app_global";
import { SESSION } from "../enums/session";
import { TweetService } from "../services/tweet_service";

export class TweetFetcherGuard extends Guard {

    service: TweetService;

    constructor(@Singleton(TweetService) service) {
        super();
        this.service = service;
    }

    async check() {
        if (this.session.sessionId) {
            await this.fetchAndSaveTweets();
        }
    }

    async fetchAndSaveTweets(lastTweetId?) {
        const tweets: any[] = await this.fetchTweets(lastTweetId);
        if (tweets.length > 0) {
            const userId = await this.session.get(SESSION.UserId);
            await this.service.saveTweets(userId, tweets);
            lastTweetId = tweets[tweets.length - 1].id;
            this.fetchAndSaveTweets(lastTweetId);
        }
    }

    fetchTweets(lastTweetId): Promise<any[]> {
        return new Promise(async (res, rej) => {
            const option = {
                count: 10
            };
            if (lastTweetId) {
                option['max_id'] = lastTweetId;
            }
            AppGLobal.twitterClient.getTimeline('home', option,
                await this.session.get(SESSION.TwitterAccessToken),
                await this.session.get(SESSION.TwitterAccessTokenSecret),
                (err, result, response) => {
                    if (err) {
                        this.logger.error('errr', err);
                        // rate limit error from twitter
                        if (err.statusCode === 429) {
                            res([]);
                        }
                        else {
                            rej(err);
                        }
                    }
                    else {
                        res(result);
                    }
                }
            );
        });
    }
}