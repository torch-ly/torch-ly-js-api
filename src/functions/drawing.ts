import {addDrawing, clearAllDrawings, getAllDrawingObjects, removeDrawing} from "../backendComunication/drawing";
import {torchly} from "../index";
import {Drawing} from "../dataTypes/Drawings/Drawing";
import {getSubscribtionFunctions} from "./subscribtions";
import {SubscribtionCallback} from "../dataTypes/Subscribe/Events";

let subscribtions = <SubscribtionCallback[]>[];

function getDrawingObjectByID(id: string): Drawing | undefined {
    return torchly.drawing.array.find((obj) => obj._id === id);
}

export const apiFunctions = {
    forceUpdate: getAllDrawingObjects,
    add: (drawing: Drawing) => addDrawing(drawing),
    remove: removeDrawing,
    removeAll: () => clearAllDrawings(),
    getByID: getDrawingObjectByID,
    ...getSubscribtionFunctions(subscribtions)
}
