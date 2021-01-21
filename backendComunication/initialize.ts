import {torchly} from "../index";
import { ApolloClient, DefaultOptions, InMemoryCache } from '@apollo/client/core';
import gql from "graphql-tag";
import WebSocket from 'ws';
import {WebSocketLink} from "@apollo/client/link/ws";
import {SubscriptionClient} from "subscriptions-transport-ws";
import logError from "../error";

export let apolloClient: ApolloClient<any>;

export default function initializeConnection() {
    let authID = torchly.auth.authID;

    const client = new SubscriptionClient(torchly.backend.url, {
        reconnect: true,
        connectionParams: {
            authID: authID
        },
        // @ts-ignore
        connectionCallback: error => error && logError("WS connection error: ", error)
    }, WebSocket);

    const cache = new InMemoryCache();
    const link = new WebSocketLink(client);

    const defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: "no-cache",
            errorPolicy: "ignore",
        },
        query: {
            fetchPolicy: "no-cache",
            errorPolicy: "all",
        },
    };

    apolloClient = new ApolloClient({
        cache,
        // @ts-ignore
        link,
        defaultOptions,
    });
}


