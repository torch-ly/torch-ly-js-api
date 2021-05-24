import {getViewport, updateViewport} from "../backendComunication/viewport";
import {Viewport} from "../dataTypes/Viewport";
import {getSubscribtionFunctions} from "./subscribtions";
import {SubscribtionCallback} from "../dataTypes/Subscribe/Events";

let subscribtions = <SubscribtionCallback[]>[];

function set(matrix: Viewport) {
    updateViewport(matrix);
}

export const apiFunctions = {
    forceUpdate: getViewport,
    set,
    ...getSubscribtionFunctions(subscribtions)
};
