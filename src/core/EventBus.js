export default class EventBus {
  constructor() {
    this.listeners = {};
  }

  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  unsubscribe(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  notify(event, data) {
    console.log('running subscribed functions')
    if (this.listeners[event]) {
      console.log(this.listeners[event])
      this.listeners[event].forEach((callback) => callback( event,data));
    }
  }
}
