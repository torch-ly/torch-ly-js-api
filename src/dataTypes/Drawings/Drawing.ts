import {removeDrawing} from "../../backendComunication/drawing";
import {Subscribable} from "../Subscribable";

export abstract class Drawing extends Subscribable {

    _id: string;
    type: string;

    delete() {
        removeDrawing(this._id);
    }

    protected constructor(id: string, type: string) {
        super();
        this._id = id;
        this.type = type;
    }
}
