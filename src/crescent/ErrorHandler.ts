/// <reference path="../index.d.ts" />

/// Imports
import Logger from './Logger';

/// Functions
function registerHandler(): void {
    Duktape.errCreate = e => {
        Logger.warn('An uncaught error was thrown.');
        Logger.warn('Info:', e.stack);
    }
}

export default {
    registerHandler
};
