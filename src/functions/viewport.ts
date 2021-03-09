import {getViewport, updateViewport} from "../backendComunication/viewport";
import {torchly} from "../index";
import {Viewport} from "../dataTypes/Viewport";

let subscribtionCallback = <Function[]>[];

function subscribe(callback: Function) {
    subscribtionCallback.push(callback);
}

function unsubscribe(callback: Function) {
    subscribtionCallback = subscribtionCallback.filter(func => func !== callback);
}

export function dataChanged() {
    subscribtionCallback.forEach((func) => func(torchly.viewport.matrix));
}

function set(matrix: Viewport) {
    updateViewport(matrix);
}

export const apiFunctions = {
    forceUpdate: getViewport,
    set,
    subscribe,
    unsubscribe,
};
