import initializeBackendCommunication from "./backendComunication/initialize";
import startSubscriptions from "./backendComunication/startSubscriptions";
import {updateData} from "./backendComunication/entities/queryAllData";
import {Torchly} from "./dataTypes/Torchly";

export let torchly: Torchly;

export async function initializeTorchly(config: { backendUrl: string; authID: string; }) {
    console.log(77)
    torchly = new Torchly(config);

    initializeBackendCommunication();
    startSubscriptions();

    await updateData();
}

export const defaultConfig = {
    backendUrl: <string>process.env.BACKEND,
    authID: <string>process.env.AUTH_ID
}
