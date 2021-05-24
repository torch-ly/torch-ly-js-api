/*import {torchly} from "../src/index";
import {Line} from "../src/dataTypes/Drawings/Line";
import {Circle} from "../src/dataTypes/Drawings/Circle";
import {Viewport} from "../src/dataTypes/Viewport";

const assert = require('assert');

describe('', () => {

    it('check default viewport', (done) => {

        try {
            assert(torchly.viewport.matrix.scale.x === 1
                && torchly.viewport.matrix.scale.y === 1
                && torchly.viewport.matrix.x === 0
                && torchly.viewport.matrix.y === 0);
        } catch (e) {
            done(e);
        }

        done();
    });

    it('change viewport', (done) => {
        new Promise((res) => {

            torchly.viewport.set(new Viewport({scale: {x: 0.5, y: 1.5}, x: 5, y: 10}));

            setTimeout(() => {
                assert(torchly.viewport.matrix.scale.x === 0.5
                    && torchly.viewport.matrix.scale.y === 1.5
                    && torchly.viewport.matrix.x === 5
                    && torchly.viewport.matrix.y === 10);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('subscribe and unsubscribe viewport', (done) => {
        new Promise((res) => {

            let res1 = false;
            let res2 = false;
            let res3 = true

            torchly.viewport.subscribe(() => res1 = true);
            torchly.viewport.subscribe(() => res2 = true);

            let func = () => res3 = false;

            torchly.viewport.subscribe(func);
            torchly.viewport.unsubscribe(func);

            torchly.viewport.set(new Viewport({scale: {x: 0.5, y: 1.5}, x: 5, y: 10}));

            setTimeout(() => {
                assert(res1 && res2 && res3);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('cleanup', (done) => {
        new Promise((res) => {

            torchly.viewport.set(new Viewport({scale: {x: 1, y: 1}, x: 0, y: 0}));

            setTimeout(() => {
                assert(torchly.viewport.matrix.scale.x === 1
                    && torchly.viewport.matrix.scale.y === 1
                    && torchly.viewport.matrix.x === 0
                    && torchly.viewport.matrix.y === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
*/
