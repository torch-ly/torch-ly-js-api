import {torchly} from "../../src/index";
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

    it('push three players and wait for subscription', (done) => {
        new Promise((res) => {

            for (let i = 0; i < 3; i++) {
                torchly.players.add(new Player({
                    name: "test player " + i,
                    gm: false,
                    id: ""
                }));
            }

            setTimeout(() => {
                assert(torchly.players.array.length === 3);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('subscribe and unsubscribe to players', (done) => {
        new Promise((res) => {

            let res1 = false;
            let res2_1 = false;
            let res2_2 = false;
            let res3 = true;

            let callback = () => res3 = false;

            torchly.players.array[0].on("change", (player: Player) => res1 = (player.name === "Changed 0"));
            torchly.players.array[0].on("change", callback);
            torchly.players.array[0].off("change", callback);

            torchly.players.array[1].on("change", (player: Player) => res2_1 = (player.name === "Changed 1"));
            torchly.players.array[1].on("change", (player: Player) => res2_2 = (player.name === "Changed 1"));

            torchly.players.array[2].on("change", callback);
            torchly.players.array[2].off("change", callback);

            for (let i = 0; i < 3; i++) {
                torchly.players.array[i].setName("Changed " + i);
            }

            setTimeout(() => {
                assert(res1 && res2_1 && res2_2 && res3);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('delete all players and wait for subscription', (done) => {
        new Promise((res) => {

            torchly.players.array.map((player) => player.delete());

            setTimeout(() => {
                assert(torchly.players.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
