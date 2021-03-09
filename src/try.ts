import {defaultConfig, initializeTorchly} from "./index";

initializeTorchly(defaultConfig);

console.log(12)

//addPlayer("test character 123")

//console.log(torchly.characters.array.length)

/*setTimeout(() => {
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
        _id: "5f4e286d8b8c353cccb1971c ",
    }));

    setTimeout(() => {
        console.log(torchly.characters.array.length)
        console.log(torchly.characters.array[0]._id)
        torchly.characters.array[0].setPlayers(["5f2997012b10402e988db93f"]);
        setTimeout(() => {
            console.log(33, torchly.characters.array[0].players)
        },1000)
    }, 1000)
}, 1000)


console.log("End");
*/

/*setTimeout(() => {
    torchly.characters.array[0].setPlayers(["5f2983d7599a67fb4618c93a", "5f2997012b10402e988db93f"]);
    setTimeout(() => {
        console.log(33, torchly.characters.array[0].players)
    },1000)
}, 1000)*/
