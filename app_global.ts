import TwitterApi from "node-twitter-api";
import { AppConfig } from "./app_config";

export class AppGLobal {
    static twitterClient;

    static initTwitterClient() {
        AppGLobal.twitterClient = new TwitterApi({
            consumerKey: AppConfig.twitterApiKey,
            consumerSecret: AppConfig.twitterApiSecret,
            callback: "http://localhost:4000/auth/twitter/callback"
        });
    }
}