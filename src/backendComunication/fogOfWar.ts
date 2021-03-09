import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {FogOfWar} from "../dataTypes/FogOfWar/FogOfWar";
import {Polygons} from "../dataTypes/FogOfWar/Polygons";

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

export async function setFogOfWar(shapes: FogOfWar[]) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation updateFogOfWar($json:JSON!){
                    updateFogOfWar(json:$json) {polygons}
                }
            `,
            variables: {
                json: shapes,
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
    torchly.fogOfWar.array = [];

    for (let shape of shapes) {
        if (shape.type === "polygon") {
            torchly.fogOfWar.array.push(new Polygons(shape));
        } else {
            console.error("Type ", shape.type, " is not a valid fog of war shape type.");
        }
    }
}
