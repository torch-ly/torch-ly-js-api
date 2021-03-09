import {FogOfWar} from "./FogOfWar";

export class Polygons extends FogOfWar{

    points: {x: number, y: number}[];

    constructor(points: { x: number; y: number; }[]) {
        super("polygon");
        this.points = points;
    }
}
