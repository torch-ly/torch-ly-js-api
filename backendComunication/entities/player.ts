import {torchly} from "../../index";
import {Player} from "../../dataTypes/Player";
import {apolloClient} from "../initialize";
import gql from "graphql-tag";
import logError from "../../error";
import {createPlayer} from "../../objectFactory";
import {dataChanged} from "../../functions/players";

export async function getAllPlayers() {
    try {
        const {data: {allPlayers}} = await apolloClient.query({
            query: gql`
            {
                allPlayers {id name gm}
            }`
        });

        updateData(allPlayers);
    } catch (e) {
        logError(e);
    }
}

export function updateData(players: Player[]) {
    torchly.players.array = players.map((player: Player) => createPlayer(player));
    players.forEach(player => dataChanged(player.id));
}

export function updateSelf(me: Player) {
    torchly.auth.name = me.name;
    torchly.auth.playerID = me.id;
    torchly.auth.gm = me.gm;
}
