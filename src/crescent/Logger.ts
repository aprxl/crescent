/// <reference path="../index.d.ts" />

/// Expressions
/**
 * Any type that can be accepted as print input.
 */
type Printable = string | number | boolean | any[];

/// Consts
const AQUA = [0, 255, 235, 255];
const YELLOW = [255, 235, 0, 255];
const BLUE = [0, 100, 255, 255];

/// Functions

/**
 * Logs a number of messages to the in-game console.
 * @param messages The desired messages
 */
function log(...messages: Printable[]) {
  Cheat.PrintColor(AQUA, "[LOG] ");
  Cheat.Print(messages.join(" ") + "\n");
}

/**
 * Warns a number of messages to the in-game console.
 * @param messages The desired warnings
 */
function warn(...messages: Printable[]) {
  Cheat.PrintColor(YELLOW, "[WARN] ");
  Cheat.Print(messages.join(" ") + "\n");
}

/**
 * Asserts a condition and prints a number of messages to the in-game console if condition is met.
 * @param assertion The condition
 * @param messages The desired messages
 */
function assert(assertion: boolean, ...messages: Printable[]) {
  if (assertion) {
    Cheat.PrintColor(BLUE, "[ASSERT] ");
    Cheat.Print(messages.join(" ") + "\n");
  }
}

/**
 * Cleares the in-game console.
 * @param amount The amount of new lines
 */
function clear(amount: number = 250) {
  Cheat.Print("\n".repeat(amount));
}

/**
 * Prints a number of messages to the in-game chat. Client-sided.
 * @param messages The desired messages
 */
function chat(...messages: Printable[]) {
  Cheat.PrintChat(messages.join(" "));
}

/**
 * Prints a number of messages to the cheat's event log.
 * @param color The desired color
 * @param messages The desired messages
 */
function event(color: number[], ...messages: Printable[]) {
  Cheat.PrintLog(messages.join(" "), color);
}

/// Exports
export default {
  log,
  warn,
  assert,
  clear,
  chat,
  event,
};
