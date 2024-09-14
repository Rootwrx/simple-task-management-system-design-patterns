/**
 * Manages the execution, undoing, and redoing of commands.
 *
 * This class implements the Command pattern to provide undo and redo functionality.
 * It maintains a history of executed commands and allows navigation through this history.
 */
export default class CommandManager {
  constructor() {
    this.history = [];
    this.historyIndex = -1;
  }

  execute(command) {
    if (typeof command.execute !== "function") {
      throw new Error("Command must have an execute method");
    }

    command.execute();
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(command);
    this.historyIndex++;
  }

  undo() {
    if (this.historyIndex >= 0) {
      const command = this.history[this.historyIndex];
      command.undo();
      this.historyIndex--;
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const command = this.history[this.historyIndex];
      command.execute();
    }
  }
}
