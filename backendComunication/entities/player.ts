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

export async function addPlayer(name: string, gm = false) {
    try {
        await apolloClient.mutate({
            mutation: gql`
            mutation addPlayer($name:String!, $gm:Boolean){
                addPlayer(name:$name, gm:$gm) {name id gm}
            }
        `,
            variables: {
                name: name,
                gm: gm
            }
        });
    } catch (e) {
        logError(e);
    }
}

export function subscribePlayer() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updatePlayer {name id gm}
            }
        `
    }).subscribe({
        next({data: {updatePlayer}}) {
            torchly.players.array.filter((player) => player.id !== updatePlayer.id);
            torchly.players.array.push(createPlayer(updatePlayer));
            torchly.players.array.sort((a, b) => a.name.localeCompare(b.name));
        }
    });
}

export function updateData(players: Player[]) {
    torchly.players.array = players.map((player: Player) => createPlayer(player));
    players.forEach(player => dataChanged(player.id));
}

export function updateSelf(me: Player) {
    if (!me) return;
    torchly.auth.name = me.name;
    torchly.auth.playerID = me.id;
    torchly.auth.gm = me.gm;
}
