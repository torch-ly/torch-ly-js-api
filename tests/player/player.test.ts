import {torchly} from "../../src";
import {addPlayer} from "../../src/backendComunication/entities/player";
import {Player} from "../../src/dataTypes/Player";

const assert = require('assert');

describe('', () => {

    it('player array is empty', (done) => {

        try {
            assert(torchly.players.array.length === 0);
        } catch (e) {
            done(e);
        }

        done();
    });

    it('push and wait for subscription', (done) => {
        new Promise((res) => {

            addPlayer(new Player({
                name: "test player",
                gm: false,
                id: "",
            }));

            setTimeout(() => {
                assert(torchly.players.array.length === 1 && torchly.players.array[0].name === "test player");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('change name', (done) => {
        new Promise((res) => {

            torchly.players.array[0].setName("changed name");

            setTimeout(() => {
                assert(torchly.players.array.length === 1 && torchly.players.array[0].name === "changed name");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('delete and wait for subscription', (done) => {
        new Promise((res) => {

            torchly.players.array[0].delete();

            setTimeout(() => {
                assert(torchly.players.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
