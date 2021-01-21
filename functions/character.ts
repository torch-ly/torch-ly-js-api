import {torchly} from "../index";
import {addCharacter, getCharacters} from "../backendComunication/entities/characters";
import {Character} from "../dataTypes/Character";

function getCharacterByID(id: string): Character | undefined {
    return torchly.characters.array.find((char) => char._id === id);
}

export const apiFunctions = {
    add: addCharacter,
    getByID: getCharacterByID,
    forceUpdateCharacters: getCharacters,
}
