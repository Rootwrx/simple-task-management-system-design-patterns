import Task from "../models/task";

export default class TaskFactory {
  static createTask({ title, type, priority, id }) {
    return new Task({ title, type, priority, id });
  }
}
