import {apolloClient} from "../../initialize";
import gql from "graphql-tag";
import logError from "../../../error";

export function setCharacterAttrs(id: string, rot: number, size: number) {
    apolloClient.mutate({
        mutation: gql`
            mutation fogOfWar($id:String!, $rot:Float!, $size:Int!){
                setCharacterRotationAndSize(id:$id, rot:$rot, size:$size) { id }
            }
        `,
        variables: {
            id: id,
            rot: rot,
            size: size
        }
    }).catch(logError);
}

export function setCharacterPosition(characterID: string, point: {x: number, y: number}) {
    apolloClient.mutate({
        mutation: gql`
            mutation setCharacterPosition($id:String!, $x:Int!, $y:Int!){
                updateCharacterPosition(id:$id, x:$x, y:$y) {pos{point{x y} rot size} name token players {id} id}
            }
        `,
        variables: {
            id: characterID,
            x: point.x,
            y: point.y
        }
    }).catch(logError);
}

export function setCharacterPlayers(characterID: string, players: string[]) {
    apolloClient.mutate({
        mutation: gql`
            mutation setCharacterPlayers($id:String!, $players:[String!]!){
                setCharacterPlayers(id:$id, players:$players) {pos{point{x y} rot size} name token players {id} id}
            }
        `,
        variables: {
            id: characterID,
            players: players
        }
    }).catch(logError);
}

export function setCharacterDetails(characterID: string, details: { hp: number; ac: number; notes: string; }) {
    apolloClient.mutate({
        mutation: gql`
            mutation setCharacterDetails($id:String!, $details:JSON!){
                setCharacterDetails(id:$id, details:$details) {pos{point{x y} rot size} name token players {id} id}
            }
        `,
        variables: {
            id: characterID,
            details: details
        }
    }).catch(logError);

}

export function setCharacterConditions(characterID: string, conditions: string[]) {
    apolloClient.mutate({
        mutation: gql`
            mutation setCharacterConditions($id:String!, $conditions:[String]!){
                setCharacterConditions(id:$id, conditions:$conditions) {pos{point{x y} rot size} name token players {id} id}
            }
        `,
        variables: {
            id: characterID,
            conditions: conditions
        }
    }).catch(logError);
}

export function setCharacterName(characterID: string, name: string) {
    apolloClient.mutate({
        mutation: gql`
            mutation setCharacterName($id:String!, $name:String!){
                setCharacterName(id:$id, name:$name) {pos{point{x y} rot size} name token players {id} id}
            }
        `,
        variables: {
            id: characterID,
            name: name
        }
    }).catch(logError);
}
