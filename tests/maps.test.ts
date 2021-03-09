import {torchly} from "../src/index";
import {Image} from "../src/dataTypes/Background/Image";

const assert = require('assert');

describe('', () => {

    it('current map is default', (done) => {
        new Promise((res) => {

            setTimeout(() => {
                assert(torchly.maps.array.length === 1
                    && torchly.maps.selected()?.name === "default");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('add new Map', (done) => {
        new Promise((res) => {

            torchly.maps.add("test");
            torchly.maps.add("test2");

            setTimeout(() => {

                torchly.maps.forceUpdate();

                setTimeout(() => {
                    assert(torchly.maps.array.length === 3
                        && torchly.maps.selected()?.name === "default");
                    res(null);
                }, 100);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('add background image', (done) => {
        new Promise((res) => {

            torchly.background.add(new Image({
                _id: "",
                width: 1,
                height: 1,
                rot: 1,
                point: {x: 1, y: 2},
                url: "testURL.com"
            }));

            setTimeout(() => {
                assert(torchly.background.array.length === 1
                    && (<Image>torchly.background.array[0]).url === "testURL.com");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('change Map', (done) => {
        new Promise((res) => {

            torchly.maps.load("test");

            setTimeout(() => {
                assert(torchly.background.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('delete Map', (done) => {
        new Promise((res) => {

            torchly.maps.remove("test2");

            setTimeout(() => {

                torchly.maps.forceUpdate();

                setTimeout(() => {
                    assert(torchly.maps.array.length === 2
                        && torchly.maps.selected()?.name === "test");
                    res(null);
                }, 100);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('cleanup Maps', (done) => {
        new Promise((res) => {

            torchly.maps.load("default");
            torchly.maps.remove("test");

            setTimeout(() => {

                torchly.maps.forceUpdate();
                torchly.background.array[0].remove();

                setTimeout(() => {
                    assert(torchly.maps.array.length === 1
                        && torchly.maps.selected()?.name === "default"
                        && torchly.background.array.length === 0);
                    res(null);
                }, 100);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

});
