export default class TodoItem {
  constructor(name, content) {
    this.name = name;
    this.content = content;
    this.createdAt = new Date();
    this.isValidTodoItem();
  }

  isValidTodoItem() {
    if (!this.name || !this.content) {
      throw new Error("Name and content are required.");
    }
    if (this.content.length > 1000) {
      throw new Error("Content must be less than 1000 characters long.");
    }
  }
}
