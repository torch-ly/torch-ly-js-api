import {getAllPlayers} from "../backendComunication/entities/player";
import {Character} from "../dataTypes/Character";
import {torchly} from "../index";
import {Player} from "../dataTypes/Player";

let subscriptionCallbacks = <{id: string, callback: Function}[]>[];

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

function subscribeChanges(id: string, callback: Function) {
    console.error("Player subscribtions are currently not available!");
    subscriptionCallbacks.push({id, callback});
}

function unsubscribeChanges(id: string, callback: Function) {
    console.error("Player subscribtions are currently not available!");
    subscriptionCallbacks = subscriptionCallbacks.filter(func => func.id === id && func.callback === callback);
}

export function dataChanged(playerID: string) {
    // console.error("Player subscribtions are currently not available!");
    let player = getPlayerByID(playerID);

    subscriptionCallbacks
        .filter((sub) => sub.id === playerID)
        .forEach((sub) => sub.callback(player));

    player?.subscriptionCallbacks.forEach((func) => func(player));
}

export const apiFunctions = {
    getCharactersByPlayerID,
    forceUpdatePlayers: getAllPlayers,
    getByID: getPlayerByID,
    subscriptionCallbacks,
    unsubscribeChanges,
    dataChanged,
}
