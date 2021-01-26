import {apolloClient} from "../../initialize";
import gql from "graphql-tag";
import logError from "../../../error";
import {torchly} from "../../../index";
import {Character} from "../../../dataTypes/Character";
import {createCharacter} from "../../../objectFactory";

export function getCharacters() {
    apolloClient.query({
        query: gql`
            {
                allCharacters{pos{point{x y} rot size} name token players {id name} id details conditions}
            }
        `
    })
    .then(({data: {allCharacters}}) => updateData(allCharacters))
    .catch(logError);
}

export function addCharacter(character: Character) {
    if (character.pos.point.x == null)
        character.pos.point.x = 0;

    if (character.pos.point.y == null)
        character.pos.point.y = 0;

    apolloClient.mutate({
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
    }).catch(logError);
}

export function removeCharacter(characterID: string) {
    if (characterID == null)
        return;

    apolloClient.mutate({
        mutation: gql`
            mutation removeCharacter($id:String!){
                removeCharacter(id:$id)
            }
        `,
        variables: {
            id: characterID
        }
    }).catch(logError);
}

export function updateData(characters: Character[]) {
    torchly.characters.array = characters.map((char: Character) => createCharacter(char));
}
