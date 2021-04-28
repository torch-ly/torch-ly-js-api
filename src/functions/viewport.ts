import {getViewport, updateViewport} from "../backendComunication/viewport";
import {torchly} from "../index";
import {Viewport} from "../dataTypes/Viewport";
import {getSubscribtionFunctions, SubscribtionCallback} from "./subscribtions";

let subscribtions = <SubscribtionCallback[]>[];


function set(matrix: Viewport) {
    updateViewport(matrix);
}

export const apiFunctions = {
    forceUpdate: getViewport,
    set,
    ...getSubscribtionFunctions(subscribtions, torchly.viewport)
};
