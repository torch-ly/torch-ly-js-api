import {torchly} from "../src/index";

const assert = require('assert');

describe('', () => {

    it('subscribe Point to', (done) => {
        new Promise((res) => {

            let res1 = false;
            let res2 = false;
            let res3 = true;

            torchly.measurement.subscribePointTo((point: {x: number, y: number}, color: string) => res1 = (point.x === 1 && point.y === 2 && color === "color"));
            torchly.measurement.subscribePointTo((point: {x: number, y: number}, color: string) => res2 = (point.x === 1 && point.y === 2 && color === "color"));

            let func = () => res3 = false;

            torchly.measurement.subscribePointTo(func);
            torchly.measurement.unsubscribePointTo(func);

            torchly.measurement.pointTo({point: {x: 1, y: 2}, color: "color"})

            setTimeout(() => {
                assert(res1 && res2 && res3);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
