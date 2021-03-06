import {apolloClient} from "../../initialize";
import gql from "graphql-tag";
import {torchly} from "../../../index";
import {dataChanged as callSubscribtionCallbacks} from "../../../functions/character";
import {createCharacter} from "../../../objectFactory";

export function subscribeCharacter() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateCharacter {pos{point{x y} rot size} name token players {id} id details conditions}
            }
        `
    }).subscribe({
        next({data: {updateCharacter}}) {
            //TODO change id anywhere to _id

            // rename some properties
            updateCharacter._id = updateCharacter.id;
            updateCharacter.players = updateCharacter.players.map((player: any) => player.id);

            // delete old character //

            // save copy of old subscribtions
            let subscribtionFunctions = [...(torchly.characters.getByID(updateCharacter._id)?.subscriptionCallbacks || [])];

            // remove old character
            torchly.characters.array = torchly.characters.array.filter((char) => char._id !== updateCharacter._id);

            // create new character
            torchly.characters.array.push(createCharacter(updateCharacter));

            // add subscribtions of old character to the new one (ts ignore cause left side can not be undefined)
            // @ts-ignore
            torchly.characters.getByID(updateCharacter._id).subscriptionCallbacks = subscribtionFunctions;

            // sort characters by name
            torchly.characters.array.sort((a, b) => a.name.localeCompare(b.name));

            callSubscribtionCallbacks(updateCharacter._id);
        }
    });
}

export function subscribeRemoveCharacter() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                removeCharacter
            }
        `
    }).subscribe({
        next({data: {removeCharacter}}) {
            torchly.characters.array = torchly.characters.array.filter(char => char._id !== removeCharacter);
            //TODO emit change event
        }
    });
}
