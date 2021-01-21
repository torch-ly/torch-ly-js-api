import {apolloClient} from "../initialize";
import gql from "graphql-tag";
import logError from "../../error";
import {torchly} from "../../index";
import {Character} from "../../dataTypes/Character";

export function getCharacters() {
    apolloClient.query({
        query: gql`
            {
                allCharacters{pos{point{x y} rot size} name token players {id name} id details conditions}
            }
        `
    }).then(({data: {allCharacters}}) => {
        updateData(allCharacters);
    }).catch(logError);
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

export function updateData(characters: { name: string; token: string; pos: { point: { x: number; y: number; }; rot: number; size: number; }; players: string[]; details: { hp: number; ac: number; notes: string; }; _id: string; conditions: string[]; }[]) {
    torchly.characters.array = characters.map((
        char: {
            name: string;
            token: string;
            pos: { point: { x: number; y: number; }; rot: number; size: number; };
            players: string[];
            details: { hp: number; ac: number; notes: string; };
            _id: string;
            conditions: string[];
        }) => new Character(char));
}
