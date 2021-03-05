describe("Tests", function () {
    importTest("Character", "./character.test.ts");
    importTest("Player", "./player.test.ts");
});

function importTest(name: string, path: string) {
    describe(name, function () {
        require(path);
    });
}
