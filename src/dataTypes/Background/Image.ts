import {Background} from "./Background";

export class Image extends Background {

    url: string;
    point: {x: number, y: number};
    rot: number;
    width: number;
    height: number;

    constructor(image: {_id: string, url: string, point: {x: number, y: number}, rot: number, width: number, height: number}) {
        super(image._id, "image");
        this.url = image.url;
        this.point = image.point;
        this.rot = image.rot;
        this.width = image.width;
        this.height = image.height;
    }

}
