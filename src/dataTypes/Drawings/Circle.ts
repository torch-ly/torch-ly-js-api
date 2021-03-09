import {Drawing} from "./Drawing";

export class Circle extends Drawing{

    center: {x: number, y: number};
    radius: number;

    constructor(drawing: {id: string, center: {x: number, y: number}, radius: number}) {
        super(drawing.id, "circle");

        this.center = drawing.center;
        this.radius = drawing.radius;
    }

}
