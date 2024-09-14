import domUpdater from "../lib/domUpdater";

class BaseView {
  update(data, options) {
    this.data = data;
    const markup = this.generateMarkup(this.data);
    console.log(this.parentElement.outerHTML)
    console.log(markup)
    domUpdater.update(this.parentElement, markup, options);
  }

  render(data) {
    this.data = data;
    const markUp = this.generateMarkup(this.data);
    this.parentElement.innerHTML = markUp;
  }

  append(data, generateItem = "generateItem") {
    const markup = this[generateItem](data);
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }

  prepend(data, generateItem = "generateItem") {
    const markup = this[generateItem](data);
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  remove(selector) {
    this.parentElement?.querySelector(selector)?.remove();
  }

}

export default BaseView;
