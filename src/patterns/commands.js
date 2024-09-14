export class AddTaskCommand {
  constructor(taskManager, task) {
    this.task = task;
    this.taskManager = taskManager;
  }

  execute() {
    this.taskManager.addTask(this.task);
  }

  undo() {
    this.taskManager.deleteTask(this.task.id);
  }
}


export class DeleteTaskCommand {
  constructor(taskManager, taskId) {
    this.taskId = taskId;
    this.deletedTask = null;
    this.taskManager = taskManager;
  }

  
  execute() {
    this.deletedTask = this.taskManager.getTasks().find(
      (el) => el.id == this.taskId
    );
    this.taskManager.deleteTask(this.taskId);
  }

  undo() {
    this.taskManager.addTask(this.deletedTask);
  }
}


export class UpdateTaskCommand {
  constructor(taskManager, taskId, updates) {
    this.taskId = taskId;
    this.updates = updates;
    this.oldValues = {};
    this.taskManager = taskManager;
  }

  execute() {
    const task = this.taskManager.getTasks().find((el) => el.id == this.taskId);
    if (task) {
      for (let key in this.updates) {
        this.oldValues[key] = task[key];
      }
    }
    this.taskManager.updateTask(this.taskId, this.updates);
  }

  undo() {
    this.taskManager.updateTask(this.taskId, this.oldValues);
  }
}
