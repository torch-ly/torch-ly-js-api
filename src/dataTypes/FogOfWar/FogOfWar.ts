import {removeFogOfWarObject} from "../../backendComunication/fogOfWar";
import {Subscribable} from "../Subscribe/Subscribable";

export abstract class FogOfWar extends Subscribable {

    type: string;
    _id: string;

    remove() {
        removeFogOfWarObject(this._id);
    }

    protected constructor(_id: string, type: string) {
        super();
        this._id = _id;
        this.type = type;
    }
}
