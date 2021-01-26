import {torchly} from "../../index";
import {Player} from "../../dataTypes/Player";
import {apolloClient} from "../initialize";
import gql from "graphql-tag";
import logError from "../../error";
import {createPlayer} from "../../objectFactory";

export function getAllPlayers() {
    apolloClient.query({
        query: gql`
            {
                allPlayers {id name gm}
            }`
    })
    .then(({data: {allPlayers}}) => updateSelf(allPlayers))
    .catch(logError);
}

export function updateData(players: { name: string; id: string; gm: boolean; }[]) {
    torchly.players.array = players.map((
        player: {
            name: string;
            id: string;
            gm: boolean;
        }) => createPlayer(player));
}

export function updateSelf(me: {name: string, id: string, gm: boolean}) {
    torchly.auth.name = me.name;
    torchly.auth.playerID = me.id;
    torchly.auth.gm = me.gm;
}
