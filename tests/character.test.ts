import {defaultConfig, initializeTorchly, torchly} from "../index";
import {addCharacter} from "../backendComunication/entities/characters/characters";
import {Character} from "../dataTypes/Character";

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

after(() => {
    torchly.closeConnections();
})
