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

export async function setBackgroundLayer(layer: Background[]) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation updateBackgroundLayer($layer:JSON!){
                    updateBackgroundLayer(layer:$layer) {layer}
                }
            `,
            variables: {
                layer,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function addBackgroundLayerObject(object: Background) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation addBackgroundLayerObject($object:JSON!){
                    addBackgroundLayerObject(object:$object) {layer}
                }
            `,
            variables: {
                object,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function removeBackgroundLayerObject(id: string) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation removeBackgroundLayerObject($id:String!){
                    removeBackgroundLayerObject(id:$id) {layer}
                }
            `,
            variables: {
                id,
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

export function updateData(layer: any[]) {
    torchly.background.array = [];

    for (let object of layer) {
        if (object.type === "image") {
            torchly.background.array.push(new Image(object));
        } else {
            console.error("Type ", object.type, " is not a valid background layer type.");
        }
    }
}
