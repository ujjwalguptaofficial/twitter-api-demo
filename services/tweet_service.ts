import { User } from "../db_schemas/user";
import { Tweets } from "../db_schemas/twitter";


export class TweetService {
    async saveTweet(tweet) {
        const entities = tweet.entities;
        if (entities && entities.urls && entities.urls.length > 0) {
            await Tweets.updateOne({ id: tweet.id }, tweet, { upsert: true });
        }
    }

    saveTweets(userId, value: any[]) {
        return Promise.all(
            value.map(tweet => {
                tweet.userId = userId;
                return this.saveTweet(tweet);
            })
        );
    }

    async  getTweetsById(userId, searchBy, searchText) {
        const query = {
            userId: userId
        };
        if (searchBy && searchText) {
            switch (searchBy) {
                case 'hashtag':
                    query['entities.hashtags.text'] = searchText;
                    break;
                case 'place':
                    query['place'] = searchText;
                    break;
            }
        }
        return await Tweets.find(query);
    }
}