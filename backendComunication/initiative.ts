import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {Character} from "../dataTypes/Character";
import {torchly} from "../index";
import {createCharacter} from "../objectFactory";
import {InitiativeValue} from "../dataTypes/InitiativeValue";

export function getInitiative() {
    apolloClient.query({
        query: gql`
            {
                getInitiative {order}
            }
		`
    })
        .then(({data}) => {
            //store.commit("character/setInitiativeOrder", data.getInitiative.order);
        })
        .catch(logError);
}

export function setInitiative() {
    apolloClient.mutate({
        mutation: gql`
            mutation setInitiative($order:JSON!){
                updateInitiative(order:$order) {order}
            }
		`,
        variables: {
            order: null //store.state.character.initiative
        }
    }).catch(logError);
}

export function addToInitiative(id: any, value: any) {
    apolloClient.mutate({
        mutation: gql`
            mutation addInitiative($id: String!, $value: Int!) {
                addToInitiative(id: $id, value: $value) {
                    order
                }
            }
		`,
        variables: {
            id, value
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
            //TODO call subscribe callbacks
        }
    });
}

export function updateData(initiative: InitiativeValue[]) {
    torchly.initiative.array = initiative.map((ini: InitiativeValue) => new InitiativeValue(ini));
}
