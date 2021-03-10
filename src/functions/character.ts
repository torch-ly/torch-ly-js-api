import {torchly} from "../index";
import {Character} from "../dataTypes/Character";
import {addCharacter, getCharacters, removeCharacter} from "../backendComunication/entities/characters/characters";
import {updateRelativeCharacterPosition} from "../backendComunication/entities/characters/characterAttributes";

function getCharacterByID(id: string): Character | undefined {
    return torchly.characters.array.find((char) => char._id === id);
}

function subscribeChanges(id: string, callback: Function) {
    getCharacterByID(id)?.subscribe(callback);
}

function unsubscribeChanges(id: string, callback: Function) {
    getCharacterByID(id)?.unsubscribe(callback);
}

export function dataChanged(characterID: string) {

    let character = getCharacterByID(characterID);

    character?.subscriptionCallbacks.forEach((func) => func(character));
}

export const apiFunctions = {
    add: addCharacter,
    removeByID: removeCharacter,
    getByID: getCharacterByID,
    forceUpdateCharacters: getCharacters,
    subscribeChanges,
    unsubscribeChanges,
    moveRelative: updateRelativeCharacterPosition
}
