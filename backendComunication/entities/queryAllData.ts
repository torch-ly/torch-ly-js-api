import gql from "graphql-tag";
import logError from "../../error";
import {apolloClient} from "../initialize";
import {updateData as updateCharacterData} from "./characters";
import {updateData as updatePlayerData, updateSelf} from "./player";
import {torchly} from "../../index";

export function updateData() {
    apolloClient.query({
        query: gql`
            {
                allCharacters{pos{point{x y} rot size} name token players {id name} id details conditions}
                me {id name gm}
                allPlayers {id name gm}
            }
        `
    }).then(({data: {allCharacters, me, allPlayers}}) => {
        updateCharacterData(allCharacters);
        updateSelf(me);
        updatePlayerData(allPlayers);
    }).catch(logError);
}
