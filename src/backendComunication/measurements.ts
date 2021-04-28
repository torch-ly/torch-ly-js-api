import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";

export async function pointTo(pointer: {point: {x: number, y: number}, color: string}) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation pointTo($pointer: PointerInput!){
                    pointTo(pointer:$pointer) {point {x y} color}
                }
            `,
            variables: {
                pointer,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export function subscribePointTo() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updatePointTo {point {x y} color}
            }
        `
    }).subscribe({
        next({data: {updatePointTo}}) {
            // TODO: add point to callbacks
            //callPointToSubscribtions(updatePointTo);
        }
    });
}
