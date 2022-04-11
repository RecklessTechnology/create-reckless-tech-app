const EventsManager = () => {
  const events = {};
  const publish = async (name, data) => {
    if (events[name.toLowerCase()] === undefined) {
      events[name.toLowerCase()] = { name, handlers: [] };
    }

    events[name.toLowerCase()].lastData = data;
    // make snapshot of handlers, to prevent inbetween unsubscribe calls
    // from mutating this array.
    await Promise.all(
      events[name.toLowerCase()].handlers.slice().map((handler) => handler(data), 1000),
    );
    return true;
  };

  const unsubscribe = (name, handler) => {
    if (events[name.toLowerCase()] === undefined) return;

    const index = events[name.toLowerCase()].handlers.indexOf(handler);
    events[name.toLowerCase()].handlers.splice(index, 1);
  };

  const subscribe = (name, handler) => {
    if (events[name.toLowerCase()] === undefined) {
      events[name.toLowerCase()] = { name, handlers: [], lastData: null };
    }
    events[name.toLowerCase()].handlers.push(handler);

    if (events[name.toLowerCase()].lastData !== null) {
      handler(events[name.toLowerCase()].lastData);
    }

    return () => unsubscribe(name, handler);
  };

  const hasSubscriptions = (name) => {
    if (events[name.toLowerCase()] === undefined) {
      return 0;
    }
    return events[name.toLowerCase()].handlers.length;
  };

  return {
    publish,
    subscribe,
    unsubscribe,
    hasSubscriptions,
  };
};

export default EventsManager;
