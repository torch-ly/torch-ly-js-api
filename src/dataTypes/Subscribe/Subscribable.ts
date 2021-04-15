import {EventMap, SubscribtionCallback, TorchlyEventListener} from "./Events";

export abstract class Subscribable {

    _subscriptionCallbacks: SubscribtionCallback[];

    on<K extends keyof EventMap>(evtStr: K, handler: TorchlyEventListener<this>): Subscribable {
        let events = (<string>evtStr).split(" ");

        for (let event of events) {
            this._subscriptionCallbacks.push({
                type: event,
                callback: handler
            });
        }

        return this;
    }

    off<K extends keyof EventMap>(evtStr: K, handler: TorchlyEventListener<this>): Subscribable {
        let events = (<string>evtStr).split(" ");

        for (let event of events) {
            this._subscriptionCallbacks = this._subscriptionCallbacks.filter(
                (obj: SubscribtionCallback) => obj.type === event && obj.callback === handler);
        }

        return this;
    }

    fire<K extends keyof EventMap>(evtStr: K): Subscribable {
        let events = (<string>evtStr).split(" ");

        for (let subscribtions of this._subscriptionCallbacks) {
            if (events.includes(<string>subscribtions.type)) {
                subscribtions.callback(this);
            }
        }

        return this;
    }

    protected constructor() {
        this._subscriptionCallbacks = [];
    }
}
