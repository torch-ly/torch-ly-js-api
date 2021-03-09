import {removeCharacter} from "../backendComunication/entities/characters/characters";
import {
    setCharacterAttrs,
    setCharacterConditions,
    setCharacterDetails,
    setCharacterName,
    setCharacterPlayers,
    setCharacterPosition, updateRelativeCharacterPosition
} from "../backendComunication/entities/characters/characterAttributes";
import {Player} from "./Player";
import {Subscribable} from "./Subscribable";
import {addToInitiative} from "../backendComunication/initiative";
import {InitiativeValue} from "./InitiativeValue";

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

        return this;
    };

    setPosition(point: { x: number, y: number }) {
        setCharacterPosition(this._id, point);

        return this;
    };

    moveRelative(point: { x: number, y: number }) {
        updateRelativeCharacterPosition(this._id, point);

        return this;
    };

    setPlayers(players: string[]): Character;
    setPlayers(players: Player[]): Character;
    setPlayers(players: any): Character {
        if (players.length === 0)
            setCharacterPlayers(this._id, []);
        else if (players[0] instanceof Player)
            setCharacterPlayers(this._id, players.map((player: Player) => player.id));
        else
            setCharacterPlayers(this._id, players);

        return this;
    }

    setDetails(details: { hp: number; ac: number; notes: string; }) {
        setCharacterDetails(this._id, details);

        return this;
    }

    setConditions(conditions: string[]) {
        setCharacterConditions(this._id, conditions);

        return this;
    }

    setName(name: string) {
        setCharacterName(this._id, name);

        return this;
    }

    setInitiative(value: number) {
        addToInitiative(new InitiativeValue({
            value,
            id: this._id
        }));

        return this;
    }

    constructor(character: {
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
