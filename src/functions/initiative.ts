import {InitiativeValue} from "../dataTypes/InitiativeValue";
import {torchly} from "../index";
import {nextInitiativeTurn, orderInitiative} from "../backendComunication/initiative";

let subscriptionCallbacks = <Function[]>[];

function getInitiativeByCharacterID(id: string): InitiativeValue | undefined {
    return torchly.initiative.array.find(ini => ini.id = id);
}

function addToInitiative(initiative: InitiativeValue) {
    torchly.initiative.array.push(initiative);
}

function removeFromInitiative(initiative: InitiativeValue) {
    torchly.initiative.array = torchly.initiative.array.filter(ini => ini === initiative);
}

function subscribeChanges(callback: Function) {
    subscriptionCallbacks.push(callback);
}

function unsubscribeChanges(callback: Function) {
    subscriptionCallbacks = subscriptionCallbacks.filter((func: Function) => func === callback);
}

function sort() {
    orderInitiative();
}

function nextTurn() {
    nextInitiativeTurn();
}

export function dataChanged() {

    subscriptionCallbacks.forEach((ini: Function) => ini(torchly.initiative.array));

    torchly.initiative.array
        .forEach(ini => ini.subscriptionCallbacks
            .forEach(sub => sub()));
}

export const apiFunctions = {
    add: addToInitiative,
    remove: removeFromInitiative,
    getByID: getInitiativeByCharacterID,
    subscribeChanges,
    unsubscribeChanges,
    sort,
    nextTurn,
}
