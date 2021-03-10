import {torchly} from "../../src/index";

const assert = require('assert');

describe('', () => {

    it('subscribe Point to', (done) => {
        console.log(torchly.lexicon.monster.array)
        assert(torchly.lexicon.monster.array.length > 0);
    });
});
