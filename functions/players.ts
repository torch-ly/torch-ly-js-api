import {getAllPlayers} from "../backendComunication/entities/player";
import {Character} from "../dataTypes/Character";
import {torchly} from "../index";

function getCharactersByPlayerID(id: string) : Character[] {
    let playerCharacters : Character[] = [];
    for (let character of torchly.characters.array)
        for (let player of character.players)
            if (player === id)
                playerCharacters.push(character);


    return playerCharacters;
}

export const apiFunctions = {
    getCharactersByPlayerID,
    forceUpdatePlayers: getAllPlayers,
}
