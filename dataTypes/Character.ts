import {removeCharacter} from "../backendComunication/entities/characters/characters";
import {
    setCharacterAttrs,
    setCharacterConditions,
    setCharacterDetails,
    setCharacterName,
    setCharacterPlayers,
    setCharacterPosition
} from "../backendComunication/entities/characters/characterAttributes";
import {Player} from "./Player";
import {Subscribable} from "./Subscribable";

export class Character extends Subscribable {
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

    async delete() {
        await removeCharacter(this._id);
    };

    setAttrs(rot: number, size: number) {
        setCharacterAttrs(this._id, rot, size);
    };

    setPosition(point: { x: number, y: number }) {
        setCharacterPosition(this._id, point);
    };

    setPlayers(players: string[]): void;
    setPlayers(players: Player[]): void;
    setPlayers(players: any): void {
        if (players.length === 0)
            setCharacterPlayers(this._id, []);
        else if (players[0] instanceof Player)
            setCharacterPlayers(this._id, players.map((player: Player) => player.id));
        else
            setCharacterPlayers(this._id, players);
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
        super();
        this.name = character.name;
        this.token = character.token;
        this.pos = character.pos;
        this.players = character.players;
        this.details = character.details;
        this._id = character._id;
        this.conditions = character.conditions;
        this.subscriptionCallbacks = [];
    }
}
