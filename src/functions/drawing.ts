import {addDrawing, clearAllDrawings, getAllDrawingObjects, removeDrawing} from "../backendComunication/drawing";
import {torchly} from "../index";
import {Drawing} from "../dataTypes/Drawings/Drawing";

let subscribtions = <Function[]>[];

function getDrawingObjectByID(id: string): Drawing | undefined {
    return torchly.drawing.array.find((obj) => obj._id === id);
}

function subscribeChanges(callback: (object: Drawing | null) => void) {
    subscribtions.push(callback);
}

function unsubscribeChanges(callback: Function) {
    subscribtions = subscribtions.filter(func => func !== callback);
}

export function dataChanged(objectID: string) {

    let object = getDrawingObjectByID(objectID);

    subscribtions.forEach(func => func((object)));

    object?.subscriptionCallbacks.forEach(func => func(object));
}

let removeSubscribtions = <Function[]>[];

function onRemove(callback: (id: string) => void) {
    removeSubscribtions.push(callback);
}

function offRemove(callback: Function) {
    removeSubscribtions = removeSubscribtions.filter(func => func !== callback);
}

export function dataRemoved(id: string) {
    removeSubscribtions.forEach(func => func(id));
}

export const apiFunctions = {
    forceUpdate: getAllDrawingObjects,
    add: addDrawing,
    remove: removeDrawing,
    removeAll: clearAllDrawings,
    getByID: getDrawingObjectByID,
    subscribeChanges,
    unsubscribeChanges,
    onRemove,
    offRemove
}
