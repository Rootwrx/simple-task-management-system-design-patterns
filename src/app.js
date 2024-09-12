import Controler from "./controllers/controller";
import Model from "./models/model";
import View from "./views/View";

document.addEventListener("DOMContentLoaded", function () {
  new Controler(new Model(), new View());
});
