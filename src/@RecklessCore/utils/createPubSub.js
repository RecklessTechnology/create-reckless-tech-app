// export const TriggerRecklessEvent = (name, data) => {
//     events[name](data);
// }

// export type PubSubHandler<T = any> = (data: T) => void | Promise<any>;

export default function createPubSub() {
    const events = {};
    async function publish(name, data) {
        
        const handlers = events[name];
        if (handlers == null) return false;

        // make snapshot of handlers, to prevent inbetween unsubscribe calls
        // from mutating this array.
        await Promise.all(handlers.slice().map(handler => handler(data)));
        return true;
    }

    function unsubscribe(
        name,
        handler,
    ) {
        const handlers = events[name];
        if (handlers == null) return;

        const index = handlers.indexOf(handler);
        handlers.splice(index, 1);
    }

    function subscribe(
        name,
        handler,
    ) {
        if (events[name] == null) {
            events[name] = [];
        }
        events[name].push(handler);

        return () => unsubscribe(name, handler);
    }

    function hasSubscriptions(name) {
        if (events[name] == null) {
            return 0;
        }
        return events[name].length;
    }

    return {
        publish,
        subscribe,
        // unsubscribe,
        hasSubscriptions,
    };
}