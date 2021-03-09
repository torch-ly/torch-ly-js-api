import {addDrawing, clearAllDrawings, getAllDrawingObjects, removeDrawing} from "../backendComunication/drawing";

export const apiFunctions = {
    forceUpdate: getAllDrawingObjects,
    add: addDrawing,
    remove: removeDrawing,
    removeAll: clearAllDrawings
}
