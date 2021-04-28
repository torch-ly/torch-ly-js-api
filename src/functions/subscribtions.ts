import {EventMap} from "../dataTypes/Subscribe/Events";
import {Subscribable, torchly} from "../index";

// set of all types this function will work on
export type SubscribableEntity = (
    typeof torchly.characters |
    typeof torchly.players |
    typeof torchly.drawing |
    typeof torchly.maps |
    typeof torchly.background |
    typeof torchly.viewport |
    typeof torchly.fogOfWar |
    typeof torchly.measurement |
    typeof torchly.initiative);

// redefinition of this types (here they have to operate on the `SubscribableEntity` type instead of the `Subscribable` type
export type SubscribtionCallback = {type: keyof EventMap, callback: TorchlyEventListener<any>};
export type TorchlyEventListener<This> = (this: This, ev: SubscribableEntity, target?: Subscribable) => void;

export function getSubscribtionFunctions(
    _subscriptionCallbacks: SubscribtionCallback[],
    subscribtionType: SubscribableEntity) {

    function on<K extends keyof EventMap>(evtStr: K, handler: TorchlyEventListener<typeof subscribtionType>): typeof subscribtionType {
        let events = (<string>evtStr).split(" ");

        for (let event of events) {
            _subscriptionCallbacks.push({
                type: event,
                callback: handler
            });
        }

        return subscribtionType;
    }

    function off<K extends keyof EventMap>(evtStr: K, handler: TorchlyEventListener<typeof subscribtionType>): typeof subscribtionType {
        let events = (<string>evtStr).split(" ");

        for (let event of events) {
            _subscriptionCallbacks = _subscriptionCallbacks.filter(
                (obj: SubscribtionCallback) => obj.type === event && obj.callback === handler);
        }

        return subscribtionType;
    }

    function fire<K extends keyof EventMap>(evtStr: K, id?: Subscribable): typeof subscribtionType {
        let events = (<string>evtStr).split(" ");

        for (let subscribtions of _subscriptionCallbacks) {
            if (events.includes(<string>subscribtions.type)) {
                subscribtions.callback(subscribtionType, id);
            }
        }

        return subscribtionType;
    }

    return {
        on,
        off,
        fire
    }
}
