import {removePlayer} from "../../backendComunication/entities/player";
import {removeDrawing} from "../../backendComunication/drawing";

export abstract class Drawing {

    _id: string;
    type: string;

    delete() {
        removeDrawing(this._id);
    }

    protected constructor(id: string, type: string) {
        this._id = id;
        this.type = type;
    }
}
