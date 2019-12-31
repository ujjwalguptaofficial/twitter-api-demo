export class AppConfig {
    static get twitterApiKey() {
        return process.env.TWITTER_API_KEY;
    }
    static get twitterApiSecret() {
        return process.env.TWITTER_API_SECRET;
    }
}