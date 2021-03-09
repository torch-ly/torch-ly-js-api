import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {Background} from "../dataTypes/Background/Background";

export async function getBackgroundLayer() {
    try {
        const {data: {getBackgroundLayer: {layer}}} = await apolloClient.query({
            query: gql`
                {
                    getBackgroundLayer {layer}
                }
            `
        });

        updateData(layer);

    } catch (e) {
        logError(e);
    }
}

export async function updateBackgroundLayer(layer: Background[]) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation updateBackgroundLayer($layer:JSON!){
                    updateBackgroundLayer(layer:$layer) {layer}
                }
            `,
            variables: {
                layer: layer,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export function subscribeBackgroundLayer() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateBackgroundLayer {layer}
            }
        `
    }).subscribe({
        next({data: {updateBackgroundLayer: {layer}}}) {
            updateData(layer);
        }
    });
}

export function updateData(drawing: Background[]) {
    torchly.background.array = drawing;
}
