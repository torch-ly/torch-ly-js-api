import {removePlayer} from "../../backendComunication/entities/player";
import {removeDrawing} from "../../backendComunication/drawing";

export abstract class Drawing {

    id: string;
    type: string;

    delete() {
        removeDrawing(this.id);
    }

    protected constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }
}
