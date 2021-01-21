import {torchly} from "../index";
import {addCharacter, getCharacters, removeCharacter} from "../backendComunication/entities/characters/characters";
import {Character} from "../dataTypes/Character";

function getCharacterByID(id: string): Character | undefined {
    return torchly.characters.array.find((char) => char._id === id);
}

export const apiFunctions = {
    add: addCharacter,
    removeByID: removeCharacter,
    getByID: getCharacterByID,
    forceUpdateCharacters: getCharacters
}
