import {Character} from "./Character";
import {torchly} from "../index"

export class Player {
    name: string;
    id: string;
    gm: boolean;

    getCharacters(id: string) : Character[] {
        let playerCharacters : Character[] = [];
        for (let character of torchly.characters)
            for (let player of character.players)
                if (player === id)
                    playerCharacters.push(character);


        return playerCharacters;
    }

    constructor( player: { name: string; id: string; gm: boolean; } ) {
        this.name = player.name;
        this.id = player.id;
        this.gm = player.gm;
    }
}
