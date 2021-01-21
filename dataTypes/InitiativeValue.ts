export class InitiativeValue {
    id: string;
    value: number;

    constructor(initiative: {id: string, value: number}) {
        this.id = initiative.id;
        this.value = initiative.value;
    }
}
