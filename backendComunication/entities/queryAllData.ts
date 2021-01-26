import gql from "graphql-tag";
import logError from "../../error";
import {apolloClient} from "../initialize";
import {updateData as updateCharacterData} from "./characters/characters";
import {updateData as updatePlayerData, updateSelf} from "./player";

export async function updateData() {
    try {
        const {data: {allCharacters, me, allPlayers}} = await apolloClient.query({
            query: gql`
                {
                    allCharacters{pos{point{x y} rot size} name token players {id name} id details conditions}
                    me {id name gm}
                    allPlayers {id name gm}
                }
            `
        });

        updateCharacterData(allCharacters);
        updateSelf(me);
        updatePlayerData(allPlayers);
    } catch (e) {
        logError(e);
    }
}