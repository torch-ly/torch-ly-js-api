import {apolloClient} from "../../initialize";
import gql from "graphql-tag";
import {torchly} from "../../../index";
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
            delete updateCharacter.id;
            updateCharacter.players = updateCharacter.players.map((player: any) => player.id);

            /*
            // TODO: remove this comment if code works
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

            callSubscribtionCallbacks(updateCharacter._id);*/

            let oldCharacter = torchly.characters.getByID(updateCharacter._id);

            if (oldCharacter) {

                oldCharacter.fire("beforeChange");
                torchly.characters.fire("beforeChange");

                for(let prop in updateCharacter) {
                    if (updateCharacter.hasOwnProperty(prop)) {
                        // @ts-ignore
                        oldCharacter[prop] = updateCharacter[prop];
                    }
                }

                oldCharacter.fire("afterChange change");
                torchly.characters.fire("afterChange change");

            } else {
                torchly.characters.array.push(createCharacter(updateCharacter));

                torchly.characters.fire("create", torchly.characters.getByID(updateCharacter._id));
            }
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
            let character = torchly.characters.getByID(removeCharacter);

            if (!character) return;

            character.fire("beforeRemove remove");
            torchly.characters.fire("beforeRemove");

            torchly.characters.array.splice(torchly.characters.array.indexOf(character), 1);

            torchly.characters.fire("afterRemove remove");

        }
    });
}
