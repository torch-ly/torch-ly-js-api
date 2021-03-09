import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {Drawing} from "../dataTypes/Drawings/Drawing";
import {torchly} from "../index";
import {Line} from "../dataTypes/Drawings/Line";
import {Circle} from "../dataTypes/Drawings/Circle";

export async function getAllDrawingObjects() {
    try {
        const {data: {getAllDrawingObjects}} = await apolloClient.query({
            query: gql`
                {
                    getAllDrawingObjects
                }
            `
        });

        updateData(getAllDrawingObjects);

    } catch (e) {
        logError(e);
    }
}

export async function addDrawing(drawing: Drawing) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation addDrawing($object:JSON!){
                    addDrawing(object:$object)
                }
            `,
            variables: {
                order: drawing,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function removeDrawing(id: string) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation removeDrawing($id:String!){
                    removeDrawing(id:$id)
                }
            `,
            variables: {
                order: id,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function clearAllDrawings() {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation {
                    clearAllDrawings
                }
            `,
            variables: {}
        });
    } catch (e) {
        logError(e);
    }
}

export function subscribeUpdateDrawing() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateDrawing
            }
        `
    }).subscribe({
        next({data: {updateDrawing}}) {
            addDrawingLocal(updateDrawing);
        }
    });
}

export function subscribeClearAllDrawings() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                clearAllDrawings
            }
        `
    }).subscribe({
        next({data: {updateDrawing}}) {
            torchly.drawing.array = [];
        }
    });
}

export function subscribeRemoveDrawing() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                removeDrawing
            }
        `
    }).subscribe({
        next({data: {removeDrawing}}) {
            torchly.drawing.array = torchly.drawing.array.filter((draw) => draw.id !== removeDrawing);
        }
    });
}

export function updateData(drawing: any[]) {
    torchly.drawing.array = drawing;
}

function addDrawingLocal(drawing: any) {
    torchly.drawing.array = torchly.drawing.array.filter((draw) => draw.id !== drawing.id);

    if (drawing.type === "line") {
        torchly.drawing.array.push(new Line(drawing));
    } else if (drawing.type === "circle") {
        torchly.drawing.array.push(new Circle(drawing));
    }
}
