import {FogOfWar} from "./FogOfWar";

export class Polygons extends FogOfWar{

    points: {x: number, y: number}[];

    constructor(polygon: {_id: string, points: { x: number; y: number; }[]}) {
        super(polygon._id, "polygon");
        this.points = polygon.points;
    }
}
