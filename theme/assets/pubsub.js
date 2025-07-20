/**
 * PubSub (Publish/Subscribe) Event System
 * Provides a simple event system for component communication
 */

let subscribers = {};

function subscribe(eventName, callback) {
  if (subscribers[eventName] === undefined) {
    subscribers[eventName] = [];
  }

  subscribers[eventName] = [...subscribers[eventName], callback];

  return function unsubscribe() {
    subscribers[eventName] = subscribers[eventName].filter((cb) => {
      return cb !== callback;
    });
  };
}

function publish(eventName, data) {
  if (subscribers[eventName]) {
    const promises = subscribers[eventName]
      .map((callback) => {
        try {
          return callback(data);
        } catch (error) {
          console.error(`Error in event subscriber for ${eventName}:`, error);
          return Promise.resolve();
        }
      })
      .filter((result) => result instanceof Promise);

    return Promise.all(promises);
  }
  return Promise.resolve();
}

// Export for use in other modules
window.subscribe = subscribe;
window.publish = publish;

// Also export as module if supported
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    subscribe,
    publish,
  };
}
