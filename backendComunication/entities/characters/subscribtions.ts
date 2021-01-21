import {apolloClient} from "../../initialize";
import gql from "graphql-tag";
import {torchly} from "../../../index";
import {Character} from "../../../dataTypes/Character";

export function subscribeCharacter() {
    apolloClient.subscribe({
        query: gql`
            subscription {
                updateCharacter {pos{point{x y} rot size} name token players {id name} id details conditions}
            }
        `
    }).subscribe({
        next({data: {updateCharacter}}) {
            torchly.characters.array = torchly.characters.array.filter((char) => char._id !== updateCharacter.id);
            torchly.characters.array.push(new Character(updateCharacter));
            torchly.characters.array.sort((a, b) => a.name.localeCompare(b.name));
            //TODO emit change event
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
