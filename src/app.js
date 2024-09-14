import TaskControler from "./controllers/taskController";
import EventBus from "./core/EventBus";

document.addEventListener("DOMContentLoaded", () => {
  new TaskControler(new EventBus());
});
