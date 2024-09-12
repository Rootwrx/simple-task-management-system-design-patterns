import BaseView from "../core/BaseView";

class Controler extends BaseView {
  constructor(model,view) {
    this.model = model;
    this.View = view;

    this.init();
  }

  init() {
    console.log(this);
  }
}

export default Controler;

