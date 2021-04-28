import {addBackgroundLayerObject, removeBackgroundLayerObject} from "../backendComunication/backgroundLayer";
import {Background, torchly} from "../index";
import {getSubscribtionFunctions, SubscribtionCallback} from "./subscribtions";

let subscribtions = <SubscribtionCallback[]>[];

function getBackgroundObjectByID(id: string): Background | undefined {
    return torchly.background.array.find((obj) => obj._id === id);
}

export const apiFunctions = {
    getByID: getBackgroundObjectByID,
    add: (obj: Background) => addBackgroundLayerObject(obj),
    remove: removeBackgroundLayerObject,
    ...getSubscribtionFunctions(subscribtions, torchly.background)
};
