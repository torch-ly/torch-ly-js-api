import {addPlayer, getAllPlayers} from "../backendComunication/entities/player";
import {Character} from "../dataTypes/Character";
import {torchly} from "../index";
import {Player} from "../dataTypes/Player";

let subscribtions = <Function[]>[];

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

function subscribeChanges(callback: Function) {
    subscribtions.push(callback);
}

function unsubscribeChanges(callback: Function) {
    subscribtions = subscribtions.filter(func => func !== callback);
}

export function dataChanged(playerID: string) {

    subscribtions.forEach(func => func());

    let player = getPlayerByID(playerID);

    player?.subscriptionCallbacks.forEach((func) => func(player));
}

export const apiFunctions = {
    getCharactersByPlayerID,
    forceUpdatePlayers: getAllPlayers,
    getByID: getPlayerByID,
    subscribeChanges,
    unsubscribeChanges,
    dataChanged,
    add: (player: Player) => addPlayer(player)
}
