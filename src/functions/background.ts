import {Background} from "../dataTypes/Background/Background";
import {
    addBackgroundLayerObject,
    removeBackgroundLayerObject,
    setBackgroundLayer
} from "../backendComunication/backgroundLayer";
import {torchly} from "../index";

function removeObject(id: string) {
    setBackgroundLayer(torchly.background.array.filter((obj: Background) => obj._id !== id));
}

export const apiFunctions = {
    add: addBackgroundLayerObject,
    remove: removeBackgroundLayerObject,
};
