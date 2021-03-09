import {Drawing} from "./Drawing";

export class Line extends Drawing {

    points: number[][];

    constructor(drawing: {id: string, points: number[][]}) {
        super(drawing.id, "line");

        this.points = drawing.points;
    }
}
