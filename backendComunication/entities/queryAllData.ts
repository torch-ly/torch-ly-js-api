import gql from "graphql-tag";
import logError from "../../error";
import {apolloClient} from "../initialize";
import {updateData as updateCharacterData} from "./characters/characters";
import {updateData as updatePlayerData, updateSelf} from "./player";
import {updateData as updateInitiativeData} from "../initiative";

export function updateData() {
    apolloClient.query({
        query: gql`
            {
                allCharacters{pos{point{x y} rot size} name token players {id name} id details conditions}
                me {id name gm}
                allPlayers {id name gm}
                getInitiative {order}
            }
        `
    }).then(({data: {allCharacters, me, allPlayers, getInitiative: {order}}}) => {
        updateCharacterData(allCharacters);
        updateSelf(me);
        updatePlayerData(allPlayers);
        updateInitiativeData(order);
    }).catch(logError);
}
