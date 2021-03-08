import {Subscribable} from "./Subscribable";

export class InitiativeValue extends Subscribable {
    id: string;
    value: number;

    constructor(initiative: {id: string, value: number}) {
        super();
        this.id = initiative.id;
        this.value = initiative.value;
    }
}
