import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";

export async function getMaps() {
    try {
        const {data: {getMaps}} = await apolloClient.query({
            query: gql`
                {
                    getMaps {name selected}
                }
            `
        });

        updateData(getMaps);

    } catch (e) {
        logError(e);
    }
}

export async function loadMap(name: string) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation loadMap($name:String!){
                    loadMap(name:$name) {layer}
                }
            `,
            variables: {
                name,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function createMap(name: string) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation createMap($name:String!){
                    createMap(name:$name) {name selected}
                }
            `,
            variables: {
                name,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function deleteMap(name: string) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation deleteMap($name:String!){
                    deleteMap(name:$name) {name selected}
                }
            `,
            variables: {
                name,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export function updateData(maps: any[]) {
    torchly.maps.array = maps;
}
