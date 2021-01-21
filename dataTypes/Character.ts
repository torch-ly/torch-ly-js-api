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
