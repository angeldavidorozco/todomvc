let uniqueID = 1;
let memoryStorage = {};

class Store {
	constructor(name, callback) {
		this._dbName = name;

		if (!memoryStorage[name]) {
			memoryStorage[name] = JSON.stringify({ todos: [] });
		}

		if (callback) {
			callback(JSON.parse(memoryStorage[name]));
		}
	}

	find(query, callback) {
		if (!callback) return;

		const { todos } = JSON.parse(memoryStorage[this._dbName]);

		const filteredTodos = todos.filter((todo) => {
			for (let q in query) {
				if (query[q] !== todo[q]) return false;
			}
			return true;
		});

		callback(filteredTodos);
	}

	findAll(callback) {
		if (!callback) return;

		const { todos } = JSON.parse(memoryStorage[this._dbName]);
		callback(todos);
	}

	save(updateData, callback, id) {
		const data = JSON.parse(memoryStorage[this._dbName]);
		const { todos } = data;

		if (id) {
			for (let todo of todos) {
				if (todo.id === id) {
					for (let key in updateData) {
						todo[key] = updateData[key];
					}
					break;
				}
			}

			memoryStorage[this._dbName] = JSON.stringify(data);

			if (callback) {
				callback(JSON.parse(memoryStorage[this._dbName]).todos);
			}
		} else {
			updateData.id = uniqueID++;
			todos.push(updateData);
			memoryStorage[this._dbName] = JSON.stringify(data);

			if (callback) {
				callback([updateData]);
			}
		}
	}

	remove(id, callback) {
		const data = JSON.parse(memoryStorage[this._dbName]);
		const { todos } = data;

		for (let i = 0; i < todos.length; i++) {
			if (todos[i].id === id) {
				todos.splice(i, 1);
				break;
			}
		}

		memoryStorage[this._dbName] = JSON.stringify(data);

		if (callback) {
			callback(JSON.parse(memoryStorage[this._dbName]).todos);
		}
	}

	drop(callback) {
		memoryStorage[this._dbName] = JSON.stringify({ todos: [] });

		if (callback) {
			callback(JSON.parse(memoryStorage[this._dbName]).todos);
		}
	}
}

export { Store };
export default Store;
