import {torchly} from "../index";
import {Character} from "../dataTypes/Character";
import {addCharacter, getCharacters, removeCharacter} from "../backendComunication/entities/characters/characters";
import {updateRelativeCharacterPosition} from "../backendComunication/entities/characters/characterAttributes";

function getCharacterByID(id: string): Character | undefined {
    return torchly.characters.array.find((char) => char._id === id);
}

let subscribtions = <Function[]>[];

function subscribeChanges(callback: (character: Character | null) => void) {
    subscribtions.push(callback);
}

function unsubscribeChanges(callback: Function) {
    subscribtions = subscribtions.filter(func => func !== callback);
}

export function dataChanged(characterID: string) {

    subscribtions.forEach((func => func(getCharacterByID(characterID))));

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
