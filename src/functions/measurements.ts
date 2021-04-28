import {pointTo} from "../backendComunication/measurements";
import {getSubscribtionFunctions, SubscribtionCallback} from "./subscribtions";
import {torchly} from "../index";

let subsctibtions = <SubscribtionCallback[]>[];

function pointToFunction(pointer: {point: {x: number, y: number}, color: string}) {
    pointTo(pointer);
}

export const apiFunctions = {
    pointTo: pointToFunction,
    ...getSubscribtionFunctions(subsctibtions, torchly.measurement)
};
