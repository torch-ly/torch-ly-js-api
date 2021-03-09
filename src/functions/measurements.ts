import {pointTo} from "../backendComunication/measurements";

let pointToSubscriptionCallbacks = <Function[]>[];

function subscribePointTo(callback: Function) {
    pointToSubscriptionCallbacks.push(callback);
}

function unsubscribePointTo(callback: Function) {
    pointToSubscriptionCallbacks = pointToSubscriptionCallbacks.filter(func => func !== callback);
}

export function callPointToSubscribtions(data: {point: {x: number, y: number}, color: string}) {
    pointToSubscriptionCallbacks.forEach(func => func(data.point, data.color));
}

function pointToFunction(pointer: {point: {x: number, y: number}, color: string}) {
    pointTo(pointer);
}

export const apiFunctions = {
    pointTo: pointToFunction,
    subscribePointTo,
    unsubscribePointTo
};
