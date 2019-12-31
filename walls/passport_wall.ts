
import { Wall, textResult } from "fortjs";
import passport from 'passport';

export class PassportWall extends Wall {
    async onIncoming() {
        await this.runMiddleware(passport.initialize());
        await this.runMiddleware(passport.session());
    }

    runMiddleware(middleware) {
        return new Promise((res, rej) => {
            middleware(this.request, this.response, res);
        });
    }
}    
