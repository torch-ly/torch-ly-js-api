import {Subscribable} from "./Subscribable";

export type EventMap = GlobalEventHandlersEventMap & {
    [index: string]: any;
};

export type SubscribtionCallback = {type: keyof EventMap, callback: TorchlyEventListener<any>};

interface GlobalEventHandlersEventMap {
    "change": Event,
    "remove": Event
}

export type TorchlyEventListener<This> = (this: This, ev: Subscribable) => void;
