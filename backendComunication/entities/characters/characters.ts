import {apolloClient} from "../../initialize";
import gql from "graphql-tag";
import logError from "../../../error";
import {torchly} from "../../../index";
import {Character} from "../../../dataTypes/Character";
import {createCharacter} from "../../../objectFactory";
import {dataChanged as callSubscribtionCallbacks} from "../../../functions/character";

export async function getCharacters() {
    try {
        const {data: {allCharacters}} = await apolloClient.query({
            query: gql`
            {
                allCharacters{pos{point{x y} rot size} name token players {id name} id details conditions}
            }
        `
        });

        updateData(allCharacters);
    } catch (e) {
        logError(e);
    }
}

export async function addCharacter(character: Character) {
    if (character.pos.point.x == null)
        character.pos.point.x = 0;

    if (character.pos.point.y == null)
        character.pos.point.y = 0;

    try {
        await apolloClient.mutate({
            mutation: gql`
            mutation addNewCharacter($name: String, $token: URL!, $pos: PositionSquareInput!, $players: [String!]!, $details: JSON){
                addCharacter(name:$name, token:$token, pos:$pos, players:$players, details:$details) {id}
            }
        `,
            variables: {
                name: character.name,
                token: character.token,
                pos: character.pos,
                players: character.players,
                details: character.details
            }
        });
    } catch (e) {
        logError(e);
    }
}

export async function removeCharacter(characterID: string) {
    if (characterID == null)
        return;

    try {
        await apolloClient.mutate({
            mutation: gql`
            mutation removeCharacter($id:String!){
                removeCharacter(id:$id)
            }
        `,
            variables: {
                id: characterID
            }
        });
    } catch (e) {
        logError(e);
    }
}

export function updateData(characters: Character[]) {
    //torchly.characters.array.push(...characters.map((char: Character) => createCharacter(char)));

    for (let char of characters) {
        let oldCharacter = torchly.characters.getByID(char._id);
        if (oldCharacter) {
            oldCharacter.name = char.name;
            oldCharacter.token = char.token;
            oldCharacter.pos = char.pos;
            oldCharacter.players = char.players;
            oldCharacter.details = char.details;
            oldCharacter.conditions = char.conditions;
        } else {
            torchly.characters.array.push(createCharacter(char));
        }
    }

    characters.forEach(char => callSubscribtionCallbacks(char._id));
}
