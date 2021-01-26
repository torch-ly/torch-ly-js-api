export abstract class Subscribable {

    subscriptionCallbacks: Function[];

    subscribe(callback: Function) {
        this.subscriptionCallbacks.push(callback);
    };

    unsubscribe(callback: Function) {
        this.subscriptionCallbacks = this.subscriptionCallbacks.filter(func => func === callback);
    }

    protected constructor() {
        this.subscriptionCallbacks = [];
    }
}
