import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";

export async function getMonsters() {
    try {
        const {data: {getMonsters}} = await apolloClient.query({
            query: gql`
                {
                    getMonsters
                }
            `
        });

        torchly.lexicon.monster.array = getMonsters;

    } catch (e) {
        logError(e);
    }
}
