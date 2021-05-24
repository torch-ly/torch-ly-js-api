import {torchly} from "../src/index";

const assert = require('assert');

describe('', () => {

    it('subscribe Point to', (done) => {
        new Promise((res) => {

            let res1 = false;
            let res2 = false;
            let res3 = true;

            torchly.measurement.on("pointTo", () => res1 = (torchly.measurement.pointToData?.point.x === 1
                && torchly.measurement.pointToData?.point.y === 2
                && torchly.measurement.pointToData?.color === "color"));
            torchly.measurement.on("pointTo",() => res2 = (torchly.measurement.pointToData?.point.x === 1
                && torchly.measurement.pointToData?.point.y === 2
                && torchly.measurement.pointToData?.color === "color"));

            let func = () => res3 = false;

            torchly.measurement.on("pointTo", func);
            torchly.measurement.off("pointTo", func);

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
