import {Background} from "./Background";

export class Image extends Background {

    url: string;

    constructor(image: {_id: string, url: string, point: {x: number, y: number}, rot: number, width: number, height: number}) {
        super(image._id, "image", image.point, image.rot, image.width, image.height);
        this.url = image.url;
    }

}
