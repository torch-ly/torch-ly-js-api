import {Subscribable} from "./Subscribable";

export type EventMap = GlobalEventHandlersEventMap & {
    [index: string]: any;
};

export type SubscribtionCallback = {type: keyof EventMap, callback: TorchlyEventListener<any>};

interface GlobalEventHandlersEventMap {
    "beforeChange": Event,
    "change": Event,
    "afterChange": Event,
    "beforeRemove": Event,
    "remove": Event,
    "afterRemove": Event
}

export type TorchlyEventListener<This> = (this: This, ev: Subscribable) => void;
