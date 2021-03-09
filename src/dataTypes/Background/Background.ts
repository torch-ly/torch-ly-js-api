export abstract class Background {

    _id: string;
    type: string;

    protected constructor(_id: string, type: string) {
        this._id = _id;
        this.type = type;
    }
}
