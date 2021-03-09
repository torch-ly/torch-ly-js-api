import {setFogOfWar, getFogOfWar, addFogOfWarObject, removeFogOfWarObject} from "../backendComunication/fogOfWar"

export const apiFunctions = {
    set: setFogOfWar,
    forceUpdate: getFogOfWar,
    add: addFogOfWarObject,
    remove: removeFogOfWarObject
};
