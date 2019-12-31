import { Controller, DefaultWorker, textResult, viewResult, Worker, Assign, Singleton, jsonResult, Guards, Route, redirectResult } from "fortjs";
import { TweetService } from "../services/tweet_service";
import { AppGLobal } from "../app_global";
import { SESSION } from "../enums/session";
import { TweetFetcherGuard } from "../guards/tweet_fetcher_guard";
import { replaceBetween } from "../helpers/replace_between";
import { tweets } from "../tweets";

export class DefaultController extends Controller {

    service: TweetService;

    constructor(@Singleton(TweetService) service) {
        super();
        this.service = service;
    }

    @Route("/")
    @Worker()
    async index(@Assign('FortJs') title: string) {
        const userIdFromSession = await this.session.get(SESSION.UserId);
        return viewResult("/default/index.html", {
            tweets: await this.service.getTweetsById(
                userIdFromSession,
                this.body.searchBy,
                this.body.searchText
            ),
            isLoggedIn: userIdFromSession != null
        });
    }

    @Worker()
    async getTweet() {
        // return jsonResult(this.service.getTweetsById(
        //     await this.session.get(SESSION.UserId),
        //     null,
        //     null
        // ));
        return jsonResult(tweets);
    }

    @Worker()
    async logout() {
        await this.session.clear();
        return redirectResult("/");
    }
}