import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {Background} from "../dataTypes/Background/Background";
import {Image} from "../dataTypes/Background/Image";

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

export function updateData(drawings: any[]) {
    for (let draw of drawings) {
        if (draw.type === "image") {
            torchly.background.array.push(new Image(draw));
        } else {
            console.error("Type ", draw.type, " is not a valid background layer type.");
        }
    }
}
