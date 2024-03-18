import { Subscription } from "rxjs";

export class SubscriptionsController {
    private subscriptions = [];

    set add(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    unsubscribe() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}