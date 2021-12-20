const EventsManager = () => {
  const events = {};
  const publish = async (name, data) => {
    if (events[name] === undefined) {
      events[name] = { name, handlers: [] };
    }

    events[name].lastData = data;
    // make snapshot of handlers, to prevent inbetween unsubscribe calls
    // from mutating this array.
    await Promise.all(events[name].handlers.slice().map((handler) => handler(data), 1000));
    return true;
  };

  const unsubscribe = (name, handler) => {
    if (events[name] === undefined) return;

    const index = events[name].handlers.indexOf(handler);
    events[name].handlers.splice(index, 1);
  };

  const subscribe = (name, handler) => {
    if (events[name] === undefined) {
      events[name] = { name, handlers: [], lastData: null };
    }
    events[name].handlers.push(handler);

    if (events[name].lastData !== null) {
      handler(events[name].lastData);
    }

    return () => unsubscribe(name, handler);
  };

  const hasSubscriptions = (name) => {
    if (events[name] === undefined) {
      return 0;
    }
    return events[name].handlers.length;
  };

  return {
    publish,
    subscribe,
    unsubscribe,
    hasSubscriptions,
  };
};

export default EventsManager;
