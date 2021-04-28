import {apolloClient} from "./initialize";
import gql from "graphql-tag";
import logError from "../error";
import {torchly} from "../index";
import {InitiativeValue} from "../dataTypes/InitiativeValue";

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

export async function setInitiative(order: InitiativeValue[]) {
    try {
        await apolloClient.mutate({
            mutation: gql`
            mutation setInitiative($order:JSON!){
                updateInitiative(order:$order) {order}
            }
            `,
            variables: {
                order,
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
    // remove removed values form initiative array
    for (let entry of torchly.initiative.array) {

        // entry id is still in new initiative
        if (initiative.filter((ini) => ini.id === entry.id).length > 0) continue;

        entry.fire("beforeRemove remove");
        entry.fire("beforeRemove");

        // remove the entry
        torchly.initiative.array.splice(torchly.initiative.array.indexOf(entry), 1);

        torchly.initiative.fire("afterRemove remove");
    }

    // update or create initiative values
    for (let entry of initiative) {
        let oldEntry = torchly.initiative.getByID(entry.id);

        if (oldEntry) { // update
            oldEntry.fire("beforeChange");
            torchly.initiative.fire("beforeChange");

            for(let prop in entry) {
                if (entry.hasOwnProperty(prop)) {
                    // @ts-ignore
                    oldEntry[prop] = entry[prop];
                }
            }

            oldEntry.fire("afterChange change");
            torchly.initiative.fire("afterChange");

        } else {
            torchly.initiative.array.push(entry);
            torchly.initiative.fire("create", torchly.initiative.getByID(entry.id));
        }
    }

    torchly.initiative.fire("change");
}
