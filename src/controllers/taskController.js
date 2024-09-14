import BaseView from "../core/BaseView";
import TaskManager from "../models/taskManager";
import CommandManager from "../patterns/commandManager";
import {
  AddTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from "../patterns/commands";
import TaskFactory from "../patterns/taskFactory";
import TaskView from "../views/taskView";

class TaskControler extends BaseView {
  constructor() {
    super();
    this.taskManager = new TaskManager();
    this.view = new TaskView();
    this.taskManager.subscribe(this.update.bind(this));
    this.commandManager = new CommandManager();

    this.taskFactory = TaskFactory;

    this.init();
  }

  init() {
    this.view.onAddTask(this.addTask.bind(this));
    this.view.onRedo(this.redo.bind(this));
    this.view.onUndo(this.undo.bind(this));
    this.view.render(this.taskManager.tasks);
    this.view.onDeleteItem(this.deleteTask.bind(this));
    this.view.onHideMoal();
    this.view.onSetEditMode();
    this.view.onEditSubmited(this.updateTask.bind(this));
  }

  addTask(taskData) {
    const task = this.taskFactory.createTask(taskData);

    const command = new AddTaskCommand(this.taskManager, task);
    this.commandManager.execute(command);
  }

  deleteTask(id) {
    const command = new DeleteTaskCommand(this.taskManager, id);
    this.commandManager.execute(command);
  }

  updateTask(taskData) {
    const command = new UpdateTaskCommand(this.taskManager, taskData.id, taskData);
    this.commandManager.execute(command);
  }
  redo() {
    this.commandManager.redo();
  }
  undo() {
    this.commandManager.undo();
  }

  update(action, data) {
    // switch (action) {
    //   case "addTask":
    //     this.view.prepend(data);
    //     break;
    //   case "removeTask":
    //     this.view.remove(data.id);
    //     break;
    //   default:
    //   }
    this.view.update(this.taskManager.tasks);
  }
}

export default TaskControler;
