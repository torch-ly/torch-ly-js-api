import Vue from "vue";
import {Character} from "./dataTypes/Character";
import {torchly} from "./index";
import {Player} from "./dataTypes/Player";

export function createCharacter(character: { name: string; token: string; pos: { point: { x: number; y: number; }; rot: number; size: number; }; players: string[]; details: { hp: number; ac: number; notes: string; }; _id: string; conditions: string[]; }) {
    if (torchly.config.vue)
        return Vue.observable(new Character(character));
    else
        return new Character(character);
}

export function createPlayer(player: { name: string; id: string; gm: boolean; }) {
    if (torchly.config.vue)
        return Vue.observable(new Player(player));
    else
        return new Player(player);
}
