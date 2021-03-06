export abstract class Subscribable {

    subscriptionCallbacks: Function[];

    subscribe(callback: Function) {
        this.subscriptionCallbacks.push(callback);
        console.log(callback)
        console.log(88, this.subscriptionCallbacks)
    };

    unsubscribe(callback: Function) {
        this.subscriptionCallbacks = this.subscriptionCallbacks.filter(func => func !== callback);
    }

    protected constructor() {
        this.subscriptionCallbacks = [];
    }
}
