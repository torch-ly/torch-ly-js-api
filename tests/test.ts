describe("Tests", function () {
    importTest("Character", "./character.test.ts");
    importTest("Player", "./player.test.ts");
    importTest("Initiative", "./initiative.test.ts");
});

function importTest(name: string, path: string) {
    describe(name, function () {
        require(path);
    });
}
