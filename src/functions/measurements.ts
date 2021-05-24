import {pointTo} from "../backendComunication/measurements";
import {getSubscribtionFunctions} from "./subscribtions";
import {SubscribtionCallback} from "../dataTypes/Subscribe/Events";

let subsctibtions = <SubscribtionCallback[]>[];

function pointToFunction(pointer: {point: {x: number, y: number}, color: string}) {
    pointTo(pointer);
}

export const apiFunctions = {
    pointTo: pointToFunction,
    ...getSubscribtionFunctions(subsctibtions)
};
