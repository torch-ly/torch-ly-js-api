import {torchly} from "../index";
import {Character} from "../dataTypes/Character";
import {addCharacter, getCharacters, removeCharacter} from "../backendComunication/entities/characters/characters";
import {updateRelativeCharacterPosition} from "../backendComunication/entities/characters/characterAttributes";
import {getSubscribtionFunctions} from "./subscribtions";
import {SubscribtionCallback} from "../dataTypes/Subscribe/Events";

let subscribtions = <SubscribtionCallback[]>[];

function getCharacterByID(id: string): Character | undefined {
    return torchly.characters.array.find((char) => char._id === id);
}

export const apiFunctions = {
    add: addCharacter,
    removeByID: removeCharacter,
    getByID: getCharacterByID,
    forceUpdateCharacters: getCharacters,
    moveRelative: updateRelativeCharacterPosition,
    ...getSubscribtionFunctions(subscribtions)
}
