import {torchly} from "../src/index";
import {addCharacter} from "../src/backendComunication/entities/characters/characters";
import {Character} from "../src/dataTypes/Character";
import {Image} from "../src/dataTypes/Background/Image";

const assert = require('assert');

describe('', () => {

    it('background array is empty', (done) => {

        try {
            assert(torchly.background.array.length === 0);
        } catch (e) {
            done(e);
        }

        done();
    });

    it('push two images and wait for subscribtion', (done) => {
        new Promise((res) => {

            for (let i = 0; i < 2; i++) {
                torchly.background.add(new Image({
                    _id: "",
                    url: "https://test.test.org" + i,
                    point: {x: 1, y: 2},
                    rot: 0.5,
                    height: 10,
                    width: 10,
                }))
            }

            setTimeout(() => {
                assert(torchly.background.array.length === 2
                    && (<Image>torchly.background.array[0]).url === "https://test.test.org0"
                    && (<Image>torchly.background.array[1]).url === "https://test.test.org1");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('remove background objects and wait for subscribtion', (done) => {
        new Promise((res) => {

            torchly.background.array[0].remove();
            torchly.background.array[1].remove();

            setTimeout(() => {
                assert(torchly.background.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));

    });

});
