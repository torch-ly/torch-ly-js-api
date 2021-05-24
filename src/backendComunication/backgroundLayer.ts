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
            torchly.background.array = [];

            for (let obj of layer) {
                if (obj.type === "image") {
                    torchly.background.array.push(new Image(obj));
                } else {
                    console.error("Unknown background layer object type", obj.type);
                }
            }
        }
    });
}

export function subscribeBackgroundLayerObjectUpdate() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateBackgroundLayerObject
            }
        `
    }).subscribe({
        next({data: {updateBackgroundLayerObject}}) {
            updateOrCreateBackgroundLayerObject(updateBackgroundLayerObject);
        }
    });
}

export function subscribeRemoveBackgroundLayerObject() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                removeBackgroundLayerObject
            }
        `
    }).subscribe({
        next({data: {removeBackgroundLayerObject}}) {

            let removedObject = torchly.background.getByID(removeBackgroundLayerObject);

            if (!removedObject) return;

            removedObject.fire("beforeRemove remove");
            torchly.background.fire("beforeRemove");

            torchly.background.array.splice(torchly.background.array.indexOf(removedObject), 1);

            torchly.background.fire("afterRemove remove");
        }
    });
}

export function updateData(layer: any[]) {
    layer.forEach((obj) => updateOrCreateBackgroundLayerObject(obj));
}

function updateOrCreateBackgroundLayerObject(object: any) {
    let oldObject = torchly.background.getByID(object._id);

    if (oldObject) {

        oldObject.fire("beforeChange");
        torchly.background.fire("beforeChange");

        for(let prop in object) {
            if (object.hasOwnProperty(prop)) {
                // @ts-ignore
                oldObject[prop] = object[prop];
            }
        }

        oldObject.fire("afterChange change");
        torchly.background.fire("afterChange change");

    } else {
        if (object.type === "image") {
            torchly.background.array.push(new Image(object));

            torchly.background.fire("create", torchly.background.getByID(object._id));
        } else {
            logError("Type ", object.type, " is not a valid background layer type.");
        }
    }

}

