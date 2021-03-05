import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {InitiativeValue} from "../dataTypes/InitiativeValue";
import {dataChanged} from "../functions/initiative";

export async function getInitiative() {
    try {
        const {data: {updateInitiative : {order}}} = await apolloClient.query({
            query: gql`
            {
                getInitiative {order}
            }
		`
        });

        updateData(order);
    } catch (e) {
        logError(e);
    }
}

export async function setInitiative(initiative: InitiativeValue[]) {
    try {
        await apolloClient.mutate({
            mutation: gql`
            mutation setInitiative($order:JSON!){
                updateInitiative(order:$order) {order}
            }
            `,
            variables: {
                order: initiative,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function orderInitiative() {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation {
                    orderInitiative {order}
                }
            `,
            variables: {}
        });
    } catch (e) {
        logError(e);
    }
}

export async function nextInitiativeTurn() {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation {
                    nextTurn {order}
                }
            `,
            variables: {}
        });
    } catch (e) {
        logError(e);
    }
}

export async function addToInitiative(initiative: InitiativeValue) {
    try {
        await apolloClient.mutate({
            mutation: gql`
                mutation addInitiative($id: String!, $value: Int!) {
                    addToInitiative(id: $id, value: $value) {order}
                }
            `,
            variables: {
                id: initiative.id,
                value: initiative.value,
            }
        });
    } catch (e) {
        logError(e);
    }
}

export function subscribeInitiative() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateInitiative {order}
            }
		`
    }).subscribe({
        next({data: {updateInitiative : {order}}}) {
            updateData(order);
        }
    });
}

export function updateData(initiative: InitiativeValue[]) {
    torchly.initiative.array = initiative.map((ini: InitiativeValue) => new InitiativeValue(ini));
    dataChanged();
}
