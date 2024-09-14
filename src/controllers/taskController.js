import BaseView from "../core/BaseView";
import TaskManager from "../models/taskManager";
import CommandManager from "../patterns/commandManager";
import {
  AddTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from "../patterns/commands";
import TaskFactory from "../patterns/taskFactory";
import { Actions } from "../utils/config";
import TaskView from "../views/taskView";

class TaskControler extends BaseView {
  constructor(eventBus) {
    super();
    this.eventBus = eventBus;
    // model
    this.taskManager = new TaskManager(this.eventBus);
    // view
    this.view = new TaskView(this.eventBus);
    // design patter
    this.commandManager = new CommandManager();
    this.taskFactory = TaskFactory;

    this.init();
  }

  init() {
    this.setUpEvents();
    this.view.render(this.taskManager.tasks);
  }

  setUpEvents() {
    this.eventBus.subscribe(Actions.addTask, this.taskAction.bind(this));
    this.eventBus.subscribe(Actions.deleteTask, this.taskAction.bind(this));
    this.eventBus.subscribe(Actions.updateTask, this.taskAction.bind(this));
    this.eventBus.subscribe(Actions.redo, this.redo.bind(this));
    this.eventBus.subscribe(Actions.undo, this.undo.bind(this));
  }

  taskAction(action, data) {
    let command;
    switch (action) {
      case Actions.addTask:
        const task = this.taskFactory.createTask(data);
        command = new AddTaskCommand(this.taskManager, task);
        break;
      case Actions.deleteTask:
        command = new DeleteTaskCommand(this.taskManager, data);
        break;
      case Actions.updateTask:
        command = new UpdateTaskCommand(this.taskManager, data.id, data);
        break;
    }
    if (!command) return;
    this.commandManager.execute(command);
    this.updateView();
  }

  redo() {
    this.commandManager.redo();
    this.updateView();
  }

  undo() {
    this.commandManager.undo();
    this.updateView();
  }

  updateView() {
    this.view.update(this.taskManager.tasks);
  }
}

export default TaskControler;
