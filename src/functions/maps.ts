import {getMaps, loadMap, createMap, deleteMap} from "../backendComunication/maps";

export const apiFunctions = {
    forceUpdate: getMaps,
    load: loadMap,
    add: createMap,
    remove: deleteMap,
};
