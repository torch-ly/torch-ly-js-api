import {torchly} from "../index";
import {addCharacter, getCharacters, removeCharacter} from "../backendComunication/entities/characters/characters";
import {Character} from "../dataTypes/Character";

let subscriptionCallbacks = <{id: string, callback: Function}[]>[];

function getCharacterByID(id: string): Character | undefined {
    return torchly.characters.array.find((char) => char._id === id);
}

function subscribeChanges(id: string, callback: Function) {
    subscriptionCallbacks.push({id, callback});
}

export function dataChanged(characterID: string) {

    let character = getCharacterByID(characterID);

    subscriptionCallbacks
        .filter((sub) => sub.id === characterID)
        .forEach((sub) => sub.callback(character));

    character?.subscriptionCallbacks.forEach((func) => func(character));
}

export const apiFunctions = {
    add: addCharacter,
    removeByID: removeCharacter,
    getByID: getCharacterByID,
    forceUpdateCharacters: getCharacters,
    subscribeChanges,
}
