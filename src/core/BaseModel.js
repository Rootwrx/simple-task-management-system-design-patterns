class BaseModel {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(action, data) {
    this.observers.forEach((observer) => observer(action, data));
  }
}

export default BaseModel;
