import {setFogOfWar, getFogOfWar, addFogOfWarObject, removeFogOfWarObject} from "../backendComunication/fogOfWar"
import {getSubscribtionFunctions, SubscribtionCallback} from "./subscribtions";
import {torchly} from "../index";

let subscribtions = <SubscribtionCallback[]>[];

export const apiFunctions = {
    set: setFogOfWar,
    forceUpdate: getFogOfWar,
    add: addFogOfWarObject,
    remove: removeFogOfWarObject,
    ...getSubscribtionFunctions(subscribtions, torchly.fogOfWar)
};
