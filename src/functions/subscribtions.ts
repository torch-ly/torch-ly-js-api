import {EventMap, SubscribtionCallback, TorchlyEventListener} from "../dataTypes/Subscribe/Events";
import {Subscribable} from "../index";

export function getSubscribtionFunctions(_subscriptionCallbacks: SubscribtionCallback[]) {

    function on<Type extends Subscribable, K extends keyof EventMap>(evtStr: K, handler: TorchlyEventListener<Type>) {
        let events = (<string>evtStr).split(" ");

        for (let event of events) {
            _subscriptionCallbacks.push({
                type: event,
                callback: handler
            });
        }

    }

    function off<Type extends Subscribable, K extends keyof EventMap>(evtStr: K, handler: TorchlyEventListener<Type>) {
        let events = (<string>evtStr).split(" ");

        for (let event of events) {
            _subscriptionCallbacks = _subscriptionCallbacks.filter(
                (obj: SubscribtionCallback) => obj.type !== event || obj.callback !== handler);
        }

    }

    function fire<K extends keyof EventMap>(evtStr: K, id?: Subscribable) {
        let events = (<string>evtStr).split(" ");

        for (let subscribtions of _subscriptionCallbacks) {
            if (events.includes(<string>subscribtions.type)) {
                subscribtions.callback(id);
            }
        }

    }

    return {
        on,
        off,
        fire
    }
}
