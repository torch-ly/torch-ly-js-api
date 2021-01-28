import {defaultConfig, initializeTorchly, torchly} from "../index";

const assert = require('assert');

before(function(done) {
    initializeTorchly(defaultConfig).then(() => {
        console.log(1); done()
    })
});

describe('character',  () => {

    it('array not empty', () => {

        assert(torchly.characters.array.length >= 0)

    });
});

after(() => {
    torchly.closeConnections();
})