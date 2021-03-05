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
            updateCharacter._id = updateCharacter.id;
            updateCharacter.players = updateCharacter.players.map((player: any) => player.id);
            torchly.characters.array = torchly.characters.array.filter((char) => char._id !== updateCharacter._id);
            torchly.characters.array.push(createCharacter(updateCharacter));
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
