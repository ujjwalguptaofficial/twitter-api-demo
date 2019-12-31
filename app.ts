import { Fort, MustacheViewEngine } from 'fortjs';
import { routes } from './routes';
import { AppGLobal } from './app_global';
import { SquirrellyViewEngine } from './extra/squirrelly_view_engine';
import * as mongoose from "mongoose";

export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = SquirrellyViewEngine;
    }

    configureTwitterLogin() {
        AppGLobal.initTwitterClient();
    }

    async initDatabase() {
        await mongoose.connect("mongodb://127.0.0.1:27017/twitter_app", { useNewUrlParser: true });
        this.logger.debug('db connected');
    }
}


