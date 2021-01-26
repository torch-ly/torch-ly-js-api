import {InitiativeValue} from "../dataTypes/InitiativeValue";
import {torchly} from "../index";

function getInitiativeByCharacterID(id: string): InitiativeValue | undefined {
    return torchly.initiative.array.find(ini => ini.id = id);
}

function addToInitiative(initiative: InitiativeValue) {
    torchly.initiative.array.push(initiative);
}

function removeFromInitiative(initiative: InitiativeValue) {
    torchly.initiative.array = torchly.initiative.array.filter(ini => ini === initiative);
}

export const apiFunctions = {
    add: addToInitiative,
    remove: removeFromInitiative,
    getByID: getInitiativeByCharacterID,
}
