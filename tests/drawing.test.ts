import {torchly} from "../src/index";
import {Line} from "../src/dataTypes/Drawings/Line";
import {Circle} from "../src/dataTypes/Drawings/Circle";

const assert = require('assert');

describe('', () => {

    it('drawing array is empty', (done) => {

        try {
            assert(torchly.drawing.array.length === 0);
        } catch (e) {
            done(e);
        }

        done();
    });

    it('add line drawing', (done) => {
        new Promise((res) => {

            torchly.drawing.add(new Line({
                _id: "",
                points: [[0,0], [1,1]]
            }));

            setTimeout(() => {
                assert(torchly.drawing.array.length === 1
                    && torchly.drawing.array[0].type === 'line'
                    && (<Line>torchly.drawing.array[0]).points[0][0] === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('remove line', (done) => {
        new Promise((res) => {

            torchly.drawing.array[0].delete();

            setTimeout(() => {
                assert(torchly.drawing.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('add circle drawing', (done) => {
        new Promise((res) => {

            for (let i = 0; i < 2; i++) {
                torchly.drawing.add(new Circle({
                    _id: "",
                    radius: 10 + i,
                    center: {x: 1, y: 2}
                }));
            }

            setTimeout(() => {
                assert(torchly.drawing.array.length === 2
                    && torchly.drawing.array[0].type === 'circle'
                    && (<Circle>torchly.drawing.array[0]).radius === 10
                    && (<Circle>torchly.drawing.array[0]).center.x === 1
                    && (<Circle>torchly.drawing.array[0]).center.y === 2
                    && torchly.drawing.array[1].type === 'circle'
                    && (<Circle>torchly.drawing.array[1]).radius === 11
                    && (<Circle>torchly.drawing.array[1]).center.x === 1
                    && (<Circle>torchly.drawing.array[1]).center.y === 2);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('removeAllDrawings', (done) => {
        new Promise((res) => {

            torchly.drawing.removeAll();

            setTimeout(() => {
                assert(torchly.drawing.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
