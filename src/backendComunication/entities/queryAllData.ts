import gql from "graphql-tag";
import logError from "../../error";
import {apolloClient} from "../initialize";
import {updateData as updateCharacterData} from "./characters/characters";
import {updateData as updatePlayerData, updateSelf} from "./player";
import {updateData as updateInitiativeData} from "../initiative";
import {updateData as updateDrawingData} from "../drawing";

export async function updateData() {
    try {
        const {data: {allCharacters, me, allPlayers, getInitiative: {order}, getAllDrawingObjects}} = await apolloClient.query({
            query: gql`
                {
                    allCharacters{pos{point{x y} rot size} name token players {id name} id details conditions}
                    me {id name gm}
                    allPlayers {id name gm}
                    getInitiative {order}
                    getAllDrawingObjects
                }
            `
        });

        allCharacters.forEach((char: any) => char._id = char.id);
        updateCharacterData(allCharacters);
        updateSelf(me);
        updatePlayerData(allPlayers);
        updateInitiativeData(order);
        updateDrawingData(getAllDrawingObjects);
    } catch (e) {
        logError(e);
    }
}
