import {torchly} from "../index";
import {addCharacter, getCharacters} from "../backendComunication/entities/characters";

function getCharacterByID(id: string) {
    return torchly.characters.find((char) => char._id === id);
}

export function apiFunctions() {
    return {
        ...addCharacter,
        ...getCharacterByID,
        forceUpdateCharacters: getCharacters,
    }
}
