import View from "./view.js";
import Controller from "./controller.js";
import Model from "./model.js";
import Store from "./store.js";
import Template from "./template.js";

import "todomvc-app-css/index.css";
import "./app.css";

class Todo {
	constructor(name) {
		this.storage = new Store(name);
		this.model = new Model(this.storage);
		this.template = new Template();
		this.view = new View(this.template);
		this.controller = new Controller(this.model, this.view);
	}
}

const onHashChange = () => {
	todo.controller.setView(document.location.hash);
};

const onLoad = () => {
	window.todo = new Todo("javascript-es6-webpack");
	onHashChange();
};

/* HOT MODULE SPECIFIC */
if (module.hot) {
	module.hot.accept(() => {});
	if (document.readyState === "complete") onLoad();
}

window.addEventListener("load", onLoad);
window.addEventListener("hashchange", onHashChange);
export default Todo;
