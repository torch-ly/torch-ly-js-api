import {Character} from "./Character";
import {torchly} from "../index"
import {Subscribable} from "./Subscribable";
import {removePlayer} from "../backendComunication/entities/player";

export class Player extends Subscribable {
    name: string;
    id: string;
    gm: boolean;

    getCharacters(): Character[] {
        let playerCharacters: Character[] = [];
        for (let character of torchly.characters.array)
            for (let player of character.players)
                if (player === this.id)
                    playerCharacters.push(character);


        return playerCharacters;
    }

    delete() {
        removePlayer(this.id);
    }

    constructor(player: { name: string; id: string; gm: boolean; }) {
        super();
        this.name = player.name;
        this.id = player.id;
        this.gm = player.gm;
    }
}
