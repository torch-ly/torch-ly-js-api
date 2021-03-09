import {getMaps, loadMap, createMap, deleteMap} from "../backendComunication/maps";
import {torchly} from "../index";

function selected(): {name: string, selected: boolean} | undefined {
    return torchly.maps.array.find(map => map.selected);
}

export const apiFunctions = {
    forceUpdate: getMaps,
    load: loadMap,
    add: createMap,
    remove: deleteMap,
    selected,
};
