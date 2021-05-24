import {updateViewport} from "../backendComunication/viewport";
import {Subscribable} from "./Subscribe/Subscribable";

export class Viewport extends Subscribable {
    scale: {x: number, y: number};
    x: number;
    y: number;

    set(matrix: Viewport) {
        updateViewport(matrix);
    }

    constructor(matrix: {scale: {x: number, y: number}, x: number, y: number}) {
        super();
        this.scale = matrix.scale;
        this.x = matrix.x;
        this.y = matrix.y;
    }
}
