import BaseView from "../core/BaseView";
import { Actions } from "../utils/config";
import { UUID } from "../utils/helpers";

class TaskView extends BaseView {
  addTask = document.querySelector(".addtask");
  form = document.querySelector(".inputs");
  parentElement = document.querySelector(".outputs");
  undo = document.querySelector(".undo");
  redo = document.querySelector(".redo");
  modal = document.querySelector(".modal");
  editingMode = false;
  constructor(eventBus) {
    super();
    this.eventBus = eventBus;
    this.setUpEvent();
  }

  generateMarkup() {
    return `
    ${this.data.map((el) => this.generateItem(el)).join("")}
    `;
  }

  renderTask(obj) {
    this.parentElement.insertAdjacentHTML("afterbegin", this.generateItem(obj));
  }

  generateItem(el) {
    return `
      <article class="task" data-id="${el.id}" data-title="${el.title}" data-status="${el.status}" data-type="${el.type}" data-priority="${el.priority}">
            <p class="task-title">${el.title}</p>
            <div class="status">
              <span class="type"> ${el.type}</span>
              <span class="priority" data-priority="${el.priority}"> ${el.priority}</span>
            </div>
            <div class="btns">
              <button class="edit">edit</button>
              <button class="delete">delete</button>
            </div>
      </article>
    `;
  }

  setUpEvent() {
    this.modal.addEventListener("click", this.onHideMoal.bind(this));
    this.parentElement.addEventListener("click", this.onSetEditMode.bind(this));
    this.redo.addEventListener("click", this.onRedo.bind(this));
    this.undo.addEventListener("click", this.onUndo.bind(this));
    this.form.addEventListener("submit", this.onAddTask.bind(this));
    this.modal.addEventListener("submit", this.onEditSubmited.bind(this));
    this.parentElement.addEventListener("click", this.onDeleteItem.bind(this));
  }

  onAddTask(e) {
    e.preventDefault();
    if (!this.form.title.value.trim()) return;

    this.eventBus.notify(Actions.addTask, {
      priority: this.form.priority.value,
      type: this.form.type.value,
      title: this.form.title.value,
      id: UUID(),
    });
  }

  onUndo() {
    this.eventBus.notify(Actions.undo);
  }

  onRedo() {
    this.eventBus.notify(Actions.redo);
  }

  remove(id) {
    super.remove(`[data-id=${id}]`);
  }

  onSetEditMode(e) {
    const { target } = e;

    if (!target.closest(".edit")) return;
    const id = target.closest(".task").dataset.id;

    this.updateModal(id);
    this.modal.classList.add("show");
  }

  extractData(taskId) {
    const task = this.parentElement.querySelector(`[data-id="${taskId}"]`);
    const { title, id, type, priority } = task.dataset;

    return { title, id, type, priority };
  }

  updateModal(taskId) {
    const data = this.extractData(taskId);
    this.elementToUpdate = data;
    console.log(this.modal);
    this.modal.querySelector(".title").value = data.title;
    this.modal.querySelector(".title").focus();
    this.modal.querySelector(".priority").value = data.priority;
    this.modal.querySelector(".type").value = data.type;
  }

  onHideMoal(e) {
    // hide only when clicking outside the updating area
    if (e.target.closest(".update-modal")) return;
    this.modal.classList.remove("show");
  }

  onEditSubmited(e) {
    e.preventDefault();

    const newTask = {
      priority: this.modal.priority.value,
      type: this.modal.type.value,
      title: this.modal.title.value,
      id: this.elementToUpdate.id,
    };

    if (this.isSameData(newTask)) return;
    this.modal.classList.remove("show");
    this.eventBus.notify(Actions.updateTask, newTask);
  }

  isSameData({ priority, type, title }) {
    if (
      priority != this.elementToUpdate.priority ||
      type != this.elementToUpdate.type ||
      title != this.elementToUpdate.title
    )
      return false;

    return true;
  }

  onDeleteItem(e) {
    const { target } = e;

    if (!target.closest(".delete")) return;
    const id = target.closest(".task").dataset.id;

    this.eventBus.notify(Actions.deleteTask, id);
  }
}

export default TaskView;
