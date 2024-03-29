import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {Viewport} from "../dataTypes/Viewport";

export async function getViewport() {
    try {
        const {data: {getViewport: {matrix}}} = await apolloClient.query({
            query: gql`
                {
                    getViewport {matrix}
                }
            `
        });

        updateData(matrix);

    } catch (e) {
        logError(e);
    }
}

export async function updateViewport(matrix: Viewport) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation updateViewport($matrix:JSON!){
                    updateViewport(matrix:$matrix) {matrix}
                }
            `,
            variables: {
                matrix,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export function subscribeViewport() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateViewport {matrix}
            }
        `
    }).subscribe({
        next({data: {updateViewport: {matrix}}}) {
            updateData(matrix);
        }
    });
}

export function updateData(matrix: Viewport) {
    torchly.viewport.matrix = new Viewport(matrix);

    torchly.viewport.fire("change");
}
