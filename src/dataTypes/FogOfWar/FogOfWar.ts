import {removeFogOfWarObject} from "../../backendComunication/fogOfWar";

export abstract class FogOfWar {

    type: string;
    _id: string;

    remove() {
        removeFogOfWarObject(this._id);
    }

    protected constructor(_id: string, type: string) {
        this._id = _id;
        this.type = type;
    }
}
