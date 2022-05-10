/// <reference path="../index.d.ts" />

import { Picker } from "./Menu";

/// Types
type ColorLike = number[];

/// Classes
class Color {
    private _color: number[];

    public static fromRGBA(rgba: number[]): Color {
        return new Color(rgba[0], rgba[1], rgba[2], rgba[3]);
    }

    public static fromPicker(path: Picker): Color {
        return Color.fromRGBA(path.getColor());
    }

    public constructor(
        r = 255,
        g = 255,
        b = 255,
        a = 255
    ) {
        this._color = [r, g, b, a];
    }

    public get r(): number {
        return this._color[0];
    }

    public set r(r: number) {
        this._color[0] = r;
    }

    public get g(): number {
        return this._color[1];
    }

    public set g(g: number) {
        this._color[1] = g;
    }

    public get b(): number {
        return this._color[2];
    }

    public set b(b: number) {
        this._color[2] = b;
    }

    public get a(): number {
        return this._color[3];
    }

    public set a(a: number) {
        this._color[3] = a;
    }

    public get rgba(): number[] {
        return this._color;
    }

    public setR(r: number): Color {
        this._color[0] = r;
        return this;
    }

    public setG(g: number): Color {
        this._color[1] = g;
        return this;
    }

    public setB(b: number): Color {
        this._color[2] = b;
        return this;
    }

    public setA(a: number): Color {
        this._color[3] = a;
        return this;
    }

    public newWithR(r: number): Color {
        return new Color(r, this.g, this.b, this.a);
    }

    public newWithG(g: number): Color {
        return new Color(this.r, g, this.b, this.a);
    }

    public newWithB(b: number): Color {
        return new Color(this.r, this.g, b, this.a);
    }

    public newWithA(a: number): Color {
        return new Color(this.r, this.g, this.b, a);
    }
}

export default Color;
