import {Subscribable} from "../Subscribable";
import {addBackgroundLayerObject, removeBackgroundLayerObject} from "../../backendComunication/backgroundLayer";

export abstract class Background extends Subscribable {

    _id: string;
    type: string;
    point: {x: number, y: number};
    rot: number;
    width: number;
    height: number;

    remove() {
        removeBackgroundLayerObject(this._id);
    };

    setPosition(point: {x: number, y: number}) {
        addBackgroundLayerObject({
            ...this,
            point
        });
    };

    setRotation(rot: number) {
        addBackgroundLayerObject({
            ...this,
            rot
        });
    };

    setSize(width: number, height: number) {
        addBackgroundLayerObject({
            ...this,
            width,
            height
        });
    };

    protected constructor(_id: string, type: string, point: {x: number, y: number}, rot: number, width: number, height: number) {
        super();
        this._id = _id;
        this.type = type;
        this.point = point;
        this.rot = rot;
        this.width = width;
        this.height = height;
    }
}
