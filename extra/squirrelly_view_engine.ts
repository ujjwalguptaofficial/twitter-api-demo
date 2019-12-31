import { ViewEngine, ViewEngineData, getViewFromFile } from "fortjs";
import * as Sqrl from "squirrelly";
import "./filters";

// squirrelly is a view engine - https://github.com/squirrellyjs/squirrelly

Sqrl.autoEscaping(false);

export class SquirrellyViewEngine implements ViewEngine {
    async render(value: ViewEngineData) {
        // read view file - getViewFromFile read view file and also cache it in production
        // here we are using compiled view so that view engine does not need to compile again
        // & thus faster rendering
        const compiledView: any = await getViewFromFile({
            fileLocation: value.view,
            mapView: (viewData) => {
                return Sqrl.Compile(viewData);
            }
        });
        return compiledView(value.model, Sqrl);
    }
}