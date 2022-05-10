/// <reference path="../index.d.ts" />

/// Types

/// Functions
function clamp<T>(val: T, min: T, max: T): T {
    return val > max ? max : val < min ? min : val;
}

function radian(val: number): number {
    return val * Math.PI / 180;
}

function degree(val: number): number {
    return val * 180 / Math.PI;
}

export default {
    clamp,
    radian,
    degree
}
