import {addPlayer, getAllPlayers} from "../backendComunication/entities/player";
import {Character} from "../dataTypes/Character";
import {torchly} from "../index";
import {Player} from "../dataTypes/Player";
import {getSubscribtionFunctions} from "./subscribtions";
import {SubscribtionCallback} from "../dataTypes/Subscribe/Events";

let subscribtions = <SubscribtionCallback[]>[];

function getCharactersByPlayerID(id: string) : Character[] {
    let playerCharacters : Character[] = [];
    for (let character of torchly.characters.array)
        for (let player of character.players)
            if (player === id)
                playerCharacters.push(character);


    return playerCharacters;
}

function getPlayerByID(id: string): Player | undefined {
    return torchly.players.array.find((char) => char.id === id);
}

export const apiFunctions = {
    getCharactersByPlayerID,
    forceUpdatePlayers: getAllPlayers,
    getByID: getPlayerByID,
    add: (player: Player) => addPlayer(player),
    ...getSubscribtionFunctions(subscribtions)
}
