import {torchly} from "../../index";
import {removeBackgroundLayerObject} from "../../backendComunication/backgroundLayer";

export abstract class Background {

    _id: string;
    type: string;

    remove() {
        removeBackgroundLayerObject(this._id);
    };

    protected constructor(_id: string, type: string) {
        this._id = _id;
        this.type = type;
    }
}
