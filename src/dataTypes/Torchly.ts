import {apiFunctions as measurementFunctions} from "../functions/measurements";
import {apiFunctions as monsterFunctions} from "../functions/lexicon/monster";
import {apiFunctions as initiativeFunctions} from "../functions/initiative";
import {apiFunctions as backgroundFunctions} from "../functions/background";
import {apiFunctions as characterFunctions} from "../functions/character";
import {apiFunctions as viewportFunctions} from "../functions/viewport";
import {apiFunctions as fogOfWarFunctions} from "../functions/fogOfWar";
import {apiFunctions as drawingFunctions} from "../functions/drawing";
import {apiFunctions as playerFunctions} from "../functions/players";
import {apiFunctions as mapsFunctions} from "../functions/maps";
import {Background} from "./Background/Background";
import {InitiativeValue} from "./InitiativeValue";
import {FogOfWar} from "./FogOfWar/FogOfWar";
import {Drawing} from "./Drawings/Drawing";
import {Character} from "./Character";
import {Viewport} from "./Viewport";
import {Player} from "./Player";

import {version} from "../../package.json";

import {closeConnections} from "../backendComunication/initialize";

export class Torchly {

    backend: {
        url: string
    };

    auth: {
        authID: string,
        playerID: string,
        name: string,
        gm: boolean,
    };

    players: {
        array: Player[],
        getCharactersByPlayerID: Function,
        forceUpdatePlayers: Function,
        getByID: Function,
        subscribeChanges: Function,
        unsubscribeChanges: Function,
        dataChanged: Function,
        add: Function
    };

    characters: {
        array: Character[],
        add: Function,
        removeByID: Function,
        getByID: Function,
        forceUpdateCharacters: Function,
        subscribeChanges: Function,
        unsubscribeChanges: Function,
        moveRelative: Function,
        onRemove: Function,
        offRemove: Function
    };

    initiative: {
        array: InitiativeValue[],
        add: Function,
        remove: Function,
        getByID: Function,
        subscribeChanges: Function,
        unsubscribeChanges: Function,
        sort: Function,
        nextTurn: Function,
    };

    drawing: {
        array: Drawing[],
        forceUpdate: Function,
        add: Function,
        remove: Function,
        removeAll: Function,
        getByID: Function,
        subscribeChanges: Function,
        unsubscribeChanges: Function,
        onRemove: Function,
        offRemove: Function
    };

    measurement: {
        pointTo: Function,
        subscribePointTo: Function,
        unsubscribePointTo: Function
    };

    background: {
        array: Background[],
        add: Function,
        remove: Function,
        getByID: Function,
        subscribeChanges: Function,
        unsubscribeChanges: Function,
        onRemove: Function,
        offRemove: Function
    };

    fogOfWar: {
        array: FogOfWar[],
        set: Function,
        forceUpdate: Function,
        add: Function,
        remove: Function
    };

    maps: {
        array: { name: string, selected: boolean }[],
        forceUpdate: Function,
        load: Function,
        add: Function,
        remove: Function,
        selected: Function,
    };

    viewport: {
        matrix: Viewport,
        forceUpdate: Function,
        set: Function,
        subscribe: Function,
        unsubscribe: Function,
    };

    lexicon: {
        monster: {
            array: Object[],
            forceUpdate: Function
        };
    };

    config: {
        vue: boolean
    };

    errors: Object[];

    version: string;

    closeConnections: Function;

    constructor(config: { backendUrl: string, authID: string }) {

        this.backend = {url: config.backendUrl};

        this.auth = {authID: config.authID, name: "", gm: false, playerID: ""};

        this.players = {array: <Player[]>[], ...playerFunctions};

        this.characters = {array: <Character[]>[], ...characterFunctions};

        this.initiative = {array: <InitiativeValue[]>[], ...initiativeFunctions};

        this.drawing = {array: <Drawing[]>[], ...drawingFunctions};

        this.measurement = {...measurementFunctions};

        this.background = {array: <Background[]>[], ...backgroundFunctions};

        this.fogOfWar = {array: <FogOfWar[]>[], ...fogOfWarFunctions};

        this.maps = {array: <{ name: string, selected: boolean }[]>[], ...mapsFunctions};

        this.viewport = {matrix: new Viewport({scale: {x: 1, y: 1}, x: 0, y: 0}), ...viewportFunctions};

        this.lexicon = {monster: {array: <Object[]>[], ...monsterFunctions}};

        this.config = {vue: true};

        this.errors = <Object[]>[];

        this.version = version;

        this.closeConnections = closeConnections;

    }

}
