import {torchly} from "../../src/index";
import {addCharacter} from "../../src/backendComunication/entities/characters/characters";
import {Character} from "../../src/dataTypes/Character";
import {addPlayer} from "../../src/backendComunication/entities/player";
import {Player} from "../../src/dataTypes/Player";

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

    it('push and wait for subscription', (done) => {
        new Promise((res) => {

            addCharacter(new Character({
                name: 'Test Character',
                token: "http://test.test.com",
                pos: {
                    point: {
                        x: 6,
                        y: 6,
                    },
                    rot: 0,
                    size: 1,
                },
                players: [],
                details: {
                    hp: 100,
                    ac: 100,
                    notes: "Test notes",
                },
                conditions: [],
                _id: "testID000000001",
            }));

            setTimeout(() => {
                assert(torchly.characters.array.length === 1);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('start position (6,6)', (done) => {

        try {
            assert(torchly.characters.array[0].pos.point.x === 6
                && torchly.characters.array[0].pos.point.y === 6);
        } catch (e) {
            done(e);
        }
        done();

    });

    it('change position', (done) => {
        new Promise((res) => {

            torchly.characters.array[0].setPosition({x: 2, y: 2});

            setTimeout(() => {
                assert(torchly.characters.array[0].pos.point.x === 2
                    && torchly.characters.array[0].pos.point.y === 2);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('change position relative', (done) => {
        new Promise((res) => {

            torchly.characters.array[0].moveRelative({x: 2, y: -2});

            setTimeout(() => {
                assert(torchly.characters.array[0].pos.point.x === 4
                    && torchly.characters.array[0].pos.point.y === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('change name', (done) => {
        new Promise((res) => {

            torchly.characters.array[0].setName("Changed Name");

            setTimeout(() => {
                assert(torchly.characters.array[0].name === "Changed Name");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('change conditions', (done) => {
        new Promise((res) => {

            torchly.characters.array[0].setConditions(["Condition1", "Condition2"]);

            setTimeout(() => {
                assert(torchly.characters.array[0].conditions.length === 2 &&
                    torchly.characters.array[0].conditions[0] === "Condition1" &&
                    torchly.characters.array[0].conditions[1] === "Condition2");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('change details', (done) => {
        new Promise((res) => {

            torchly.characters.array[0].setDetails({hp: 100, ac: 101, notes: "test note"});

            setTimeout(() => {
                assert(torchly.characters.array[0].details.hp === 100 &&
                    torchly.characters.array[0].details.ac === 101 &&
                    torchly.characters.array[0].details.notes === "test note");
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('change players', (done) => {
        new Promise((res) => {

            addPlayer(new Player({
                name: "test character",
                gm: false,
                id: "",
            }));

            setTimeout(() => {
                torchly.characters.array[0].setPlayers([torchly.players.array[0].id]);

                setTimeout(() => {
                    assert(torchly.characters.array[0].players.length === 1 &&
                        torchly.characters.array[0].players[0] === torchly.players.array[0].id);

                    torchly.players.array[0].delete(); // delete to clean up array

                    setTimeout(() => {
                        res(null);
                    }, 100);
                }, 100);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('remove and wait for subscription', (done) => {
        new Promise((res) => {

            torchly.characters.array[0].delete();

            setTimeout(() => {
                assert(torchly.characters.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
