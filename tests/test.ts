import {defaultConfig, initializeTorchly, torchly} from "../src/index";

before(function (done) {

    console.log("Testing torchly API version " + torchly.version + ".\n");

    initializeTorchly(defaultConfig).then(() => {
        done();
    }).catch(() => done());
});

describe("Tests", function () {
    importTest("Character", "./character/character.test.ts");
    importTest("Character Subscribtions", "./character/character-subscribtions.test.ts");
    importTest("Player", "./player.test.ts");
    importTest("Initiative", "./initiative.test.ts");
    importTest("Drawing", "./drawing.test.ts");
    importTest("Point to field", "./pointTo.test.ts");
    importTest("Background", "./background-layer.test.ts");
});

function importTest(name: string, path: string) {
    describe(name, function () {
        require(path);
    });
}

after(() => {
    torchly.closeConnections();
})
