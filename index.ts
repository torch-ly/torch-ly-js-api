import {Player} from "./dataTypes/Player"
import {Character} from "./dataTypes/Character";
import {InitiativeValue} from "./dataTypes/InitiativeValue";
import initializeBackendCommunication from "./backendComunication/initialize";
import {updateData} from "./backendComunication/entities/queryAllData";
import {apiFunctions as characterFunctions} from "./functions/character";
import {apiFunctions as playerFunctions} from "./functions/players";

export const torchly = {

    initialized: false,

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

    initiative: <InitiativeValue[]>[],


};

export function initializeTorchly(config: { backendUrl: string; authID: string; }) {
    torchly.backend.url = config.backendUrl;
    torchly.auth.authID = config.authID;
}

initializeTorchly({
    backendUrl: "wss://server.erichier.tech:5000/graphql",
    authID: "gm"
})

initializeBackendCommunication();
updateData();
