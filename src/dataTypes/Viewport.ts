export class Viewport {
    scale: {x: number, y: number};
    x: number;
    y: number;

    set(matrix: Viewport) {

    }

    constructor(matrix: {scale: {x: number, y: number}, x: number, y: number}) {
        this.scale = matrix.scale;
        this.x = matrix.x;
        this.y = matrix.y;
    }
}
