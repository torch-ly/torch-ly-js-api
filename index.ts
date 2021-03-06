import {Player} from "./dataTypes/Player"
import {Character} from "./dataTypes/Character";
import {InitiativeValue} from "./dataTypes/InitiativeValue";
import initializeBackendCommunication, {closeConnections} from "./backendComunication/initialize";
import startSubscriptions from "./backendComunication/startSubscriptions";
import {updateData} from "./backendComunication/entities/queryAllData";
import {apiFunctions as characterFunctions} from "./functions/character";
import {apiFunctions as playerFunctions} from "./functions/players";
import {apiFunctions as initiativeFunctions} from "./functions/initiative";

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

    config: {
        vue: true,
    },

    closeConnections

};

export async function initializeTorchly(config: { backendUrl: string; authID: string; }) {
    torchly.backend.url = config.backendUrl;
    torchly.auth.authID = config.authID;

    initializeBackendCommunication();
    startSubscriptions();

    console.log(12)
    await updateData();
}

export const defaultConfig = {
    backendUrl: <string>process.env.BACKEND,
    authID: <string>process.env.AUTH_ID
}
