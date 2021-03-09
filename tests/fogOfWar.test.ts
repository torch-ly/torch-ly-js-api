import {torchly} from "../src/index";
import {Polygon} from "../src/dataTypes/FogOfWar/Polygon";

const assert = require('assert');

describe('', () => {

    it('empty fog of war array', (done) => {
        try {
            assert(torchly.fogOfWar.array.length === 0);
        } catch (e) {
            done(e);
        }
        done();
    });

    it('add fog of war polygon', (done) => {
        new Promise((res) => {

            torchly.fogOfWar.add(new Polygon({
                _id: "",
                points: [
                    {x: 0, y: 0},
                    {x: 10, y: 0},
                    {x: 10, y: 10},
                    {x: 0, y: 10},
                    {x: 0, y: 0},
                ]
            }));

            setTimeout(() => {
                assert(torchly.fogOfWar.array.length === 1 && (<Polygon>torchly.fogOfWar.array[0]).points.length === 5);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('remove fog of war polygon', (done) => {
        new Promise((res) => {

            torchly.fogOfWar.array[0].remove();

            setTimeout(() => {
                assert(torchly.fogOfWar.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
