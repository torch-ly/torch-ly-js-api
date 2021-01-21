import {removeCharacter} from "../backendComunication/entities/characters/characters";
import {
    setCharacterAttrs, setCharacterConditions, setCharacterDetails, setCharacterName,
    setCharacterPlayers,
    setCharacterPosition
} from "../backendComunication/entities/characters/characterAttributes";
import {Player} from "./Player";

export class Character {
    name: string;
    token: string;
    pos: {
        point: {
            x: number;
            y: number;
        };
        rot: number;
        size: number;
    };
    players: string[];
    details: {
        hp: number;
        ac: number;
        notes: string;
    };
    _id: string;
    conditions: string[];

    remove() {
        removeCharacter(this._id);
    };

    setAttrs(rot: number, size:  number) {
        setCharacterAttrs(this._id, rot, size);
    };

    setPosition(point: {x: number, y: number}) {
        setCharacterPosition(this._id, point);
    };

    setPlayers(players: string[] | Player[]) {
        //TODO implement
    }

    setDetails(details: { hp: number; ac: number; notes: string; }) {
        setCharacterDetails(this._id, details)
    }

    setConditions(conditions: string[]) {
        setCharacterConditions(this._id, conditions)
    }

    setName(name: string) {
        setCharacterName(this._id, name);
    }

    constructor( character: {
        name: string;
        token: string;
        pos: {
            point: {
                x: number;
                y: number;
            },
            rot: number;
            size: number;
        };
        players: string[];
        details: {
            hp: number;
            ac: number;
            notes: string;
        };
        _id: string;
        conditions: string[];
    } ) {
        this.name = character.name;
        this.token = character.token;
        this.pos = character.pos;
        this.players = character.players;
        this.details = character.details;
        this._id = character._id;
        this.conditions = character.conditions;
    }
}
