/**
 * Manages the execution, undoing, and redoing of commands.
 *
 * This class implements the Command pattern to provide undo and redo functionality.
 * It maintains a history of executed commands and allows navigation through this history.
 */
export default class CommandManager {
  /**
   * Creates a new CommandManager instance.
   *
   * Initializes an empty command history and sets the history index to -1,
   * indicating that no commands have been executed yet.
   */
  constructor() {
    /**
     * @private
     * @type {Array<Command>}
     * The list of executed commands.
     */
    this.history = [];

    /**
     * @private
     * @type {number}
     * The current index in the command history.
     * -1 indicates no commands have been executed.
     */
    this.historyIndex = -1;
  }

  /**
   * Executes a command and adds it to the command history.
   *
   * This method will also clear any undone commands if executing after an undo operation.
   *
   * @param {Command} command - The command to execute.
   * @throws {Error} If the command doesn't have an execute method.
   */
  execute(command) {
    if (typeof command.execute !== "function") {
      throw new Error("Command must have an execute method");
    }

    command.execute();
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(command);
    this.historyIndex++;
  }

  /**
   * Undoes the most recently executed command.
   *
   * If there are no commands to undo (i.e., we're at the beginning of the history),
   * this method does nothing.
   *
   * @throws {Error} If the command doesn't have an undo method.
   */
  undo() {
    if (this.historyIndex >= 0) {
      const command = this.history[this.historyIndex];
      if (typeof command.undo !== "function") {
        throw new Error("Command must have an undo method");
      }

      command.undo();
      this.historyIndex--;
    }
  }

  /**
   * Redoes the most recently undone command.
   *
   * If there are no commands to redo (i.e., we're at the end of the history),
   * this method does nothing.
   *
   * @throws {Error} If the command doesn't have an execute method.
   */
  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const command = this.history[this.historyIndex];
      if (typeof command.execute !== "function") {
        throw new Error("Command must have an execute method");
      }

      command.execute();
    }
  }
}
