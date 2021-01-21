import {Player} from "./dataTypes/Player"
import initializeBackendCommunication from "./backendComunication/initialize";
import {updateData} from "./backendComunication/entities/queryAllData";
import {apiFunctions as characterFunctions} from "./functions/character";
import {Character} from "./dataTypes/Character";

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

    players: [
        new Player({
            name: "Eric",
            id: "5f2997012b10402e988db93f",
            gm: false,
        })
    ],

    characters: {
        array: <Character[]>[],
        ...characterFunctions,
    },

    initiative: [
        { id: "ebyqd2akhxla5rz", value: 22 }
    ],

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

