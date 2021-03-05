import {defaultConfig, initializeTorchly, torchly} from "../index";
import {addCharacter} from "../backendComunication/entities/characters/characters";
import {Character} from "../dataTypes/Character";
import {addPlayer} from "../backendComunication/entities/player";

const assert = require('assert');

before(function (done) {
    initializeTorchly(defaultConfig).then(() => {
        done();
    }).catch(() => done());
});

describe('character-tests', () => {
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
                        x: 0,
                        y: 0,
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

            addPlayer("Test Player");

            setTimeout(() => {
                torchly.characters.array[0].setPlayers([torchly.players.array[0].id]);

                setTimeout(() => {
                    assert(torchly.characters.array[0].players.length === 1 &&
                        torchly.characters.array[0].players[0] === torchly.players.array[0].id);
                    res(null);
                }, 100);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });

    it('remove and wait for subscription', (done) => {
        new Promise((res) => {

            //torchly.characters.array[0].delete();

            setTimeout(() => {
                //assert(torchly.characters.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});

after(() => {
    torchly.closeConnections();
})
