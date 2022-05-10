/// <reference path="../index.d.ts" />

/// Imports
import Logger from "./Logger";

/// Expressions
type Callback = (...args: any[]) => void;
type List<T> = { [key: string]: T };

/// Globals
let callbackHandlers: List<Function> = {};
let callbacks: List<Callback[]> = {};

/// Functions
/**
 * Returns whether or not a callback handler is already registered
 * @param callbackName The desired callback
 * @returns {boolean}
 */
function handlerExists(callbackName: string): boolean {
  return callbackName in callbackHandlers;
}

/**
 * Returns whether or not a callback is already registered
 * @param callbackName The desired callback
 * @returns {boolean}
 */
function callbackExists(callbackName: string): boolean {
  return callbackName in callbacks;
}

/**
 * Adds a callback handler.
 * @param callbackName The desired callback
 * @returns {boolean} Whether the handler was created
 */
function addHandler(callbackName: string): boolean {
  if (handlerExists(callbackName)) {
    return false;
  }

  callbackHandlers[callbackName] = new Function(`
    var list = callbacks["${callbackName}"];
    for (var i = 0; i < list.length; i++) {
      list[i]("${callbackName}");
    }
  `);

  return true;
}

/**
 * Adds a callback
 * @param callbackName The desired callback
 * @param func The callback function
 */
function addCallback(callbackName: string, func: Callback) {
  if (!callbackExists(callbackName)) {
    callbacks[callbackName] = [];
  }

  callbacks[callbackName].push(func);
}

/**
 * Adds a callback and its respective handler.
 * @param callbackName The desired callback
 * @param func The callback function
 */
function on(callbackName: string, func: Callback): void {
  addHandler(callbackName);
  addCallback(callbackName, func);
}

/**
 * Invokes a custom callback.
 * @param callbackName The desired callback
 * @param args The arguments that should be called
 * @returns {boolean} Whether the callback was called
 */
function invoke(callbackName: string, ...args: any[]): boolean {
  if (!handlerExists(callbackName)) {
    Logger.warn(`This callback (${callbackName}) doesn't exist!`);
    return false;
  }

  callbackHandlers[callbackName](args);
  return true;
}

/**
 * Registers all callback handlers.
 */
function registerCallbacks(): void {
  for (const clbk in callbackHandlers) {
    Cheat.RegisterCallback(clbk, `callbackHandlers.${clbk}`);
  }
}

export default {
  addHandler,
  addCallback,
  on,
  invoke,
  registerCallbacks,
};
