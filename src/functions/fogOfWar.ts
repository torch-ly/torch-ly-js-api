import {setFogOfWar, getFogOfWar, addFogOfWarObject, removeFogOfWarObject} from "../backendComunication/fogOfWar"
import {getSubscribtionFunctions} from "./subscribtions";
import {SubscribtionCallback} from "../dataTypes/Subscribe/Events";

let subscribtions = <SubscribtionCallback[]>[];

export const apiFunctions = {
    set: setFogOfWar,
    forceUpdate: getFogOfWar,
    add: addFogOfWarObject,
    remove: removeFogOfWarObject,
    ...getSubscribtionFunctions(subscribtions)
};
