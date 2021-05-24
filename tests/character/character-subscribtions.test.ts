import {Subscribable, torchly} from "../../src";
import {Character} from "../../src";

const assert = require('assert');

describe('', () => {

    it('character array is empty', (done) => {

        try {
            assert(torchly.characters.array.length === 0);
        } catch (e) {
            done(e);
        }

        done();
    });

    it('push three characters and wait for subscription', (done) => {
        new Promise((res) => {

            for (let i = 0; i < 3; i++) {
                torchly.characters.add(new Character({
                    name: 'Test Character ' + i,
                    token: "http://test.test.com",
                    pos: {point: {x: 0, y: 0,}, rot: 0, size: 1,},
                    players: [],
                    details: {hp: 100, ac: 100, notes: "Test notes",},
                    conditions: [],
                    _id: "testID00000000" + i,
                }));
            }

            setTimeout(() => {
                assert(torchly.characters.array.length === 3);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('subscribe and unsubscribe to character', (done) => {
        new Promise((res) => {

            let res1 = false;
            let res2_1 = false;
            let res2_2 = false;
            let res3 = true;

            let callback = () => res3 = false;

            torchly.characters.array[0].on("change",(character: Character) => res1 = (character.name === "Changed 0"));
            torchly.characters.array[0].on("change", callback);
            torchly.characters.array[0].off("change", callback);

            torchly.characters.array[1].on("change", (character: Character) => res2_1 = (character.name === "Changed 1"));
            torchly.characters.array[1].on("change", (character: Character) => res2_2 = (character.name === "Changed 1"));

            torchly.characters.array[2].on("change", callback);
            torchly.characters.array[2].off("change", callback);

            for (let i = 0; i < 3; i++) {
                torchly.characters.array[i].setName("Changed " + i);
            }

            setTimeout(() => {
                assert(res1 && res2_1 && res2_2 && res3);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('delete all characters and wait for subscription', (done) => {
        new Promise((res) => {

            torchly.characters.array.map((char) => char.delete());

            setTimeout(() => {
                assert(torchly.characters.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
