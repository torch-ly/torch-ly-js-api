import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {InitiativeValue} from "../dataTypes/InitiativeValue";
import {dataChanged} from "../functions/initiative";

export function getInitiative() {
    apolloClient.query({
        query: gql`
            {
                getInitiative {order}
            }
		`
    })
        .then(({data: {updateInitiative : {order}}}) => updateData(order))
        .catch(logError);
}

export function setInitiative(initiative: InitiativeValue[]) {
    apolloClient.mutate({
        mutation: gql`
            mutation setInitiative($order:JSON!){
                updateInitiative(order:$order) {order}
            }
		`,
        variables: {
            order: initiative,
        }
    }).catch(logError);
}

export function addToInitiative(initiative: InitiativeValue) {
    apolloClient.mutate({
        mutation: gql`
            mutation addInitiative($id: String!, $value: Int!) {
                addToInitiative(id: $id, value: $value) {order}
            }
		`,
        variables: {
            id: initiative.id,
            value: initiative.value,
        }
    }).catch(logError);
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
