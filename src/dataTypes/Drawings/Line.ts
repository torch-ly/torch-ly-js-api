import {Drawing} from "./Drawing";

export class Line extends Drawing {

    points: number[][];

    constructor(drawing: {_id: string, points: number[][]}) {
        super(drawing._id, "line");

        this.points = drawing.points;
    }
}
