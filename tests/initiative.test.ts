import {torchly} from "../src/index";
import {addCharacter} from "../src/backendComunication/entities/characters/characters";
import {Character} from "../src/dataTypes/Character";

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
                addCharacter(new Character({
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

    it('add three initiative values', (done) => {
        new Promise((res) => {

            torchly.characters.array[0].setInitiative(10);
            torchly.characters.array[1].setInitiative(5);
            torchly.characters.array[2].setInitiative(20);

            setTimeout(() => {
                assert(torchly.initiative.array.length === 3 &&
                    torchly.initiative.array[0].value === 10 &&
                    torchly.initiative.array[1].value === 5 &&
                    torchly.initiative.array[2].value === 20);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));

    });

    it('order initiative values', (done) => {
        new Promise((res) => {

            torchly.initiative.sort();

            setTimeout(() => {
                assert(torchly.initiative.array.length === 3 &&
                    torchly.initiative.array[0].value === 20 &&
                    torchly.initiative.array[1].value === 10 &&
                    torchly.initiative.array[2].value === 5);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));

    });

    it('next initiative turn', (done) => {
        new Promise((res) => {

            torchly.initiative.nextTurn();
            torchly.initiative.nextTurn();

            setTimeout(() => {
                assert(torchly.initiative.array.length === 3 &&
                    torchly.initiative.array[0].value === 5 &&
                    torchly.initiative.array[1].value === 20 &&
                    torchly.initiative.array[2].value === 10);
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
                assert(torchly.players.array.length === 0);
                res(null);
            }, 100);

        })
            .then(() => done())
            .catch((err) => done(err));
    });
});
