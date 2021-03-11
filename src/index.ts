import initializeBackendCommunication from "./backendComunication/initialize";
import startSubscriptions from "./backendComunication/startSubscriptions";
import {updateData} from "./backendComunication/entities/queryAllData";
import {Torchly} from "./dataTypes/Torchly";
import {Background} from "./dataTypes/Background/Background";
import {Image} from "./dataTypes/Background/Image";
import {Circle} from "./dataTypes/Drawings/Circle";
import {Drawing} from "./dataTypes/Drawings/Drawing";
import {Line} from "./dataTypes/Drawings/Line";
import {FogOfWar} from "./dataTypes/FogOfWar/FogOfWar";
import {Polygon} from "./dataTypes/FogOfWar/Polygon";
import {Character} from "./dataTypes/Character";
import {InitiativeValue} from "./dataTypes/InitiativeValue";
import {Player} from "./dataTypes/Player";
import {Subscribable} from "./dataTypes/Subscribable";
import {Viewport} from "./dataTypes/Viewport";

export {Background, Image, Circle, Drawing, Line, FogOfWar, Polygon, Character, InitiativeValue, Player, Subscribable, Viewport, Torchly}

export let torchly: Torchly;

export async function initializeTorchly(config: { backendUrl: string; authID: string; }) {

    torchly = new Torchly(config);

    initializeBackendCommunication();
    startSubscriptions();

    await updateData();
}

export const defaultConfig = {
    backendUrl: <string>process.env.BACKEND,
    authID: <string>process.env.AUTH_ID
}
