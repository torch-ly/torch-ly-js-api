import {Player} from "./dataTypes/Player"
import {Character} from "./dataTypes/Character";
import {InitiativeValue} from "./dataTypes/InitiativeValue";
import {Drawing} from "./dataTypes/Drawings/Drawing";
import {Background} from "./dataTypes/Background/Background";
import {FogOfWar} from "./dataTypes/FogOfWar/FogOfWar";
import {Viewport} from "./dataTypes/Viewport";
import initializeBackendCommunication, {closeConnections} from "./backendComunication/initialize";
import startSubscriptions from "./backendComunication/startSubscriptions";
import {updateData} from "./backendComunication/entities/queryAllData";
import {apiFunctions as characterFunctions} from "./functions/character";
import {apiFunctions as playerFunctions} from "./functions/players";
import {apiFunctions as initiativeFunctions} from "./functions/initiative";
import {apiFunctions as drawingFunctions} from "./functions/drawing";
import {apiFunctions as measurementFunctions} from "./functions/measurements";
import {apiFunctions as backgroundFunctions} from "./functions/background";
import {apiFunctions as fogOfWarFunctions} from "./functions/fogOfWar";
import {apiFunctions as mapsFunctions} from "./functions/maps";
import {apiFunctions as viewportFunctions} from "./functions/viewport";
import {apiFunctions as monsterFunctions} from "./functions/lexicon/monster";

import {version} from "../package.json";

export const torchly = {

    backend: {
        url: ""
    },

    auth: {
        authID: "",
        playerID: "",
        name: "",
        gm: false,
    },

    players: {
        array: <Player[]>[],
        ...playerFunctions,
    },

    characters: {
        array: <Character[]>[],
        ...characterFunctions,
    },

    initiative: {
        array: <InitiativeValue[]>[],
        ...initiativeFunctions,
    },

    drawing: {
        array: <Drawing[]>[],
        ...drawingFunctions
    },

    measurement : {
        ...measurementFunctions,
    },

    background: {
        array: <Background[]>[],
        ...backgroundFunctions
    },

    fogOfWar: {
        array: <FogOfWar[]>[],
        ...fogOfWarFunctions
    },

    maps: {
        array: <{name: string, selected: boolean}[]>[],
        ...mapsFunctions
    },

    viewport: {
        matrix: new Viewport({scale: {x: 1, y: 1}, x: 0, y: 0}),
        ...viewportFunctions
    },

    lexicon: {
        monster: {
            array: <Object[]>[],
            ...monsterFunctions
        },
    },

    config: {
        vue: true
    },

    errors: <Object[]>[],

    version,

    closeConnections

};

export async function initializeTorchly(config: { backendUrl: string; authID: string; }) {
    torchly.backend.url = config.backendUrl;
    torchly.auth.authID = config.authID;

    initializeBackendCommunication();
    startSubscriptions();

    await updateData();
}

export const defaultConfig = {
    backendUrl: <string>process.env.BACKEND,
    authID: <string>process.env.AUTH_ID
}
