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
    "afterRemove": Event,
    "create": Event,
    "pointTo": Event
}

export type TorchlyEventListener<Type extends Subscribable> = (ev: Type) => void;
