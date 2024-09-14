class TaskManager {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  addTask(task) {
    this.tasks.unshift(task);
    this.save();
  }

  updateTask(id, data) {
    const task = this.tasks.find((task) => task.id == id);
    task.title = data.title;
    task.priority = data.priority;
    task.type = data.type;

    this.save();
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((el) => el.id == id);
    if (index == -1) return;
    this.tasks.splice(index, 1);
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
