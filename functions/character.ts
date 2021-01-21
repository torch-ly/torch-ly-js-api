import {torchly} from "../index";
import {addCharacter, getCharacters} from "../backendComunication/entities/characters";

function getCharacterByID(id: string) {
    return torchly.characters.array.find((char) => char._id === id);
}

export function apiFunctions() {
    return {
        add: addCharacter,
        getByID: getCharacterByID,
        forceUpdateCharacters: getCharacters,
    }
}
