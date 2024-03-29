import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {FogOfWar} from "../dataTypes/FogOfWar/FogOfWar";
import {Polygon} from "../dataTypes/FogOfWar/Polygon";

export async function getFogOfWar() {
    try {
        const {data: {getFogOfWar: {polygons}}} = await apolloClient.query({
            query: gql`
                {
                    getFogOfWar {polygons}
                }
            `
        });

        updateData(polygons);

    } catch (e) {
        logError(e);
    }
}

export async function setFogOfWar(json: FogOfWar[]) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation updateFogOfWar($json:JSON!){
                    updateFogOfWar(json:$json) {polygons}
                }
            `,
            variables: {
                json,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function addFogOfWarObject(json: FogOfWar) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation addFogOfWarObject($json:JSON!){
                    addFogOfWarObject(json:$json) {polygons}
                }
            `,
            variables: {
                json,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function removeFogOfWarObject(id: string) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation removeFogOfWarObject($id:String!){
                    removeFogOfWarObject(id:$id) {polygons}
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

export function subscribeFogOfWar() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateFogOfWar {polygons}
            }
        `
    }).subscribe({
        next({data: {updateFogOfWar: {polygons}}}) {
            updateData(polygons);
        }
    });
}

export function updateData(shapes: any[]) {
    //TODO: add events
    torchly.fogOfWar.array = [];

    for (let shape of shapes) {
        if (shape.type === "polygon") {
            torchly.fogOfWar.array.push(new Polygon(shape));
        } else {
            console.error("Type ", shape.type, " is not a valid fog of war shape type.");
        }
    }
}
