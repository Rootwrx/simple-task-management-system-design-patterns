import EventBus from "../core/EventBus";
class TaskManager extends EventBus {
  constructor() {
    super();
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  addTask(task) {
    this.tasks.unshift(task);
    this.notify("updateTasks", task);
  }

  updateTask(id, data) {
    const el = this.tasks.find((el) => el.id == id);
    el.title = data.title;
    el.priority = data.priority;
    el.type = data.type;

    this.notify("updateTasks", el);
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((el) => el.id == id);
    if (index == -1) return;
    this.tasks.splice(index, 1);

    this.notify("updateTasks", { id });
  }

  notify(event, data) {
    super.notify(event, data);
    this.save();
  }

  getTasks() {
    return this.tasks;
  }
  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}

export default TaskManager;
