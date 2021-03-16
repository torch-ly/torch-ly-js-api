import {
    addBackgroundLayerObject,
    removeBackgroundLayerObject
} from "../backendComunication/backgroundLayer";
import {Background, torchly} from "../index";

let subscribtions = <Function[]>[];

function getBackgroundObjectByID(id: string): Background | undefined {
    return torchly.background.array.find((obj) => obj._id === id);
}

function subscribeChanges(callback: (object: Background | null) => void) {
    subscribtions.push(callback);
}

function unsubscribeChanges(callback: Function) {
    subscribtions = subscribtions.filter(func => func !== callback);
}

export function dataChanged(objectID: string) {

    let object = getBackgroundObjectByID(objectID);

    subscribtions.forEach(func => func((object)));

    object?.subscriptionCallbacks.forEach(func => func(object));
}

export const apiFunctions = {
    getByID: getBackgroundObjectByID,
    add: (obj: Background) => addBackgroundLayerObject(obj),
    remove: removeBackgroundLayerObject,
    subscribeChanges,
    unsubscribeChanges
};
