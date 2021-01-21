import {Player} from "./dataTypes/Player"
import {Character} from "./dataTypes/Character";
import {init} from "./backendComunication/initialize";

export const torchly = {

    initialized: false,

    backend: {
        url: "wss://server.erichier.tech:5000/graphql"
    },

    auth: {
        authID: "243lhj5bkl23b45b2348g7b7234iouv5o2z34v52oi34v5iou234b5o",
        playerID: "5f2997012b10402e988db93g",
        name: "Caesar",
        gm: true,
    },

    players: [
        new Player({
            name: "Eric",
            id: "5f2997012b10402e988db93f",
            gm: false,
        })
    ],

    characters: [new Character({
        name: "Acolyte",
        token: "https://5e.tools/img/MM/Acolyte.png",
        pos: {
            point: {
                x: 4,
                y: 3
            },
            rot: 0,
            size: 1
        },
        players: [
            "5f2997012b10402e988db93f"
        ],
        details: {
            hp: 0,
            ac: 10,
            notes: ""
        },
        _id: "ebyqd2akhxla5rz",
        conditions: ["Blinded"]
    })],

    initiative: [
        { id: "ebyqd2akhxla5rz", value: 22 }
    ]

};

let defaultConfig = {
    backendUrl: "",
    authID: "123",
}

export function initializeTorchly(config: { backendUrl: string; authID: string; }) {
    defaultConfig = config;
}

init().then(r => console.log).catch(console.log);
