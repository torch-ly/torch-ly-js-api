import {getMaps, loadMap, createMap, deleteMap} from "../backendComunication/maps";
import {torchly} from "../index";
import {getSubscribtionFunctions} from "./subscribtions";
import {SubscribtionCallback} from "../dataTypes/Subscribe/Events";

let subscribtions = <SubscribtionCallback[]>[];

function selected(): {name: string, selected: boolean} | undefined {
    return torchly.maps.array.find(map => map.selected);
}

export const apiFunctions = {
    forceUpdate: getMaps,
    load: loadMap,
    add: createMap,
    remove: deleteMap,
    selected,
    ...getSubscribtionFunctions(subscribtions)
};
