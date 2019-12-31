import { DefaultController } from "./controllers/default_controller";
import { ParentRoute } from "fortjs";
import { AuthController } from "./controllers/auth_controller";

export const routes: ParentRoute[] = [{
    path: "/*",
    controller: DefaultController
}, 
{
    path: "/auth",
    controller: AuthController
}
];