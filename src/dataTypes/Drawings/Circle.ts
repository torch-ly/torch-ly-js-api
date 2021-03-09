import {Drawing} from "./Drawing";

export class Circle extends Drawing{

    center: {x: number, y: number};
    radius: number;

    constructor(drawing: {_id: string, center: {x: number, y: number}, radius: number}) {
        super(drawing._id, "circle");

        this.center = drawing.center;
        this.radius = drawing.radius;
    }

}
