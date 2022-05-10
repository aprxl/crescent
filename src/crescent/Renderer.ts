/// <reference path="../index.d.ts" />

/// Imports
import { Vector2 } from './Vector';

/// Types
type Color = number[];

type LineProps = {
  x: number;
  y: number;
  x2: number;
  y2: number;
  color?: Color;
};

type RectProps = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  filled?: boolean;
  color?: Color;
};

type GradientProps = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  colors: Color[];
  horizontal?: boolean;
  percentage?: number;
};

type CircleProps = {
  x: number;
  y: number;
  outer?: number;
  inner?: number;
  start?: number;
  amount?: number;
  color?: Color;
};

type TextProps = {
  x: number;
  y: number;
  text: string | number | boolean | any[];
  color?: Color;
  font?: number;
  alignment?: "left" | "center" | "right";
  shadow?: Color;
  shadowOffset?: number;
  outline?: Color;
  outlineWidth?: number;
  transform?: "none" | "uppercase" | "lowercase";
};

type FontProps = {
  name: string;
  size?: number;
  windows?: boolean;
};

/// Constants
const IVORY = [235, 235, 235, 255];

/// Globals
let RENDERWEIGHT = 1;

/// Functions
function adjustColor(color: number[]) {
  return [
    color[0],
    color[1],
    color[2],
    color[3] * RENDERWEIGHT
  ];
}

/**
 * Renders a line between two points.
 * @param props
 */
function line({ x, y, x2, y2, color = IVORY }: LineProps) {
  color = adjustColor(color);

  Render.Line(x, y, x2, y2, color);
}

/**
 * Renders a simple rectangle.
 * @param props
 */
function rectangle({
  x,
  y,
  w = 100,
  h = 100,
  filled = true,
  color = IVORY,
}: RectProps) {
  color = adjustColor(color);

  Render[filled ? "FilledRect" : "Rect"](x, y, w, h, color);
}

/**
 * Renders a gradient rectangle.
 * @param props
 */
function gradient({
  x,
  y,
  w = 100,
  h = 100,
  colors,
  horizontal = true,
  percentage = 1,
}: GradientProps) {
  colors[0] = adjustColor(colors[0]);
  colors[1] = adjustColor(colors[1]);

  if (percentage === 1) {
    Render.GradientRect(
      x,
      y,
      w,
      h,
      +horizontal,
      colors[0],
      colors[1]
    );
  } else if (percentage === 0) {
    Render.GradientRect(
      x,
      y,
      w,
      h,
      +horizontal,
      colors[1],
      colors[0]
    );
  } else {
    if (horizontal) {
      Render.GradientRect(
        x,
        y,
        w * percentage,
        h,
        1,
        colors[0],
        colors[1]
      );
      Render.GradientRect(
        x + w * percentage,
        y,
        w * (1 - percentage),
        h,
        1,
        colors[1],
        colors[0]
      );
    } else {
      Render.GradientRect(
        x,
        y,
        w,
        h * percentage,
        0,
        colors[0],
        colors[1]
      );
      Render.GradientRect(
        x,
        y + h * percentage,
        w,
        h * (1 - percentage),
        0,
        colors[1],
        colors[0]
      );
    }
  }
}

/**
 * Renders a circle.
 * @param props
 */
function circle({
  x,
  y,
  outer = 50,
  inner = 0,
  start = 0,
  amount = 1,
  color = IVORY,
}: CircleProps) {
  const SEGMENTS = 32;

  color = adjustColor(color);

  if (start === 0 && amount === 1) {
    Render.Arc(x, y, outer, inner, 0, 360, SEGMENTS, color);
  } else {
    Render.Arc(
      x,
      y,
      outer,
      inner,
      start,
      amount * 360,
      SEGMENTS,
      color
    );
  }
}

/**
 * Renders a text.
 * @param props
 */
function text({
  x,
  y,
  text,
  color = IVORY,
  font = Render.GetFont("segoeuib.ttf", 24, true),
  alignment = "left",
  shadow,
  shadowOffset = 1,
  outline,
  outlineWidth = 1,
  transform = "none",
}: TextProps) {
  const centered = +(alignment === "center");

  color = adjustColor(color);
  text = text.toString();

  const textsize = Render.TextSize(text, font);

  if (transform === "uppercase") {
    text = text.toUpperCase();
  } else if (transform === "lowercase") {
    text = text.toLowerCase();
  }

  if (alignment === "right") {
    x -= textsize[0];
  }

  if (shadow) {
    shadow = adjustColor(shadow);

    Render.String(x, y + shadowOffset, centered, text, shadow, font);
  }

  if (outline) {
    outline = adjustColor(outline);

    for (let i = 1; i <= outlineWidth; i++) {
      Render.String(x - i, y - i, centered, text, outline, font);
      Render.String(x + i, y - i, centered, text, outline, font);
      Render.String(x - i, y + i, centered, text, outline, font);
      Render.String(x + i, y + i, centered, text, outline, font);
    }
  }

  Render.String(x, y, centered, text, color, font);
}

/**
 * Creates/retrieves a font.
 * @param props
 * @returns {number}
 */
function font({
  name,
  size = 24,
  windows = true,
}: FontProps): number {
  return Render.GetFont(name, size, windows);
}

/**
 * Returns the game's window size
 * @returns {Vector2 | number[]}
 */
function getScreenSize(): Vector2 {
  return Vector2.from(Render.GetScreenSize())
}

/**
 * Returns the current rendering weight.
 * @returns {number}
 */
function getWeight(): number {
  return RENDERWEIGHT;
}

/**
 * Overrides the current rendering weight. The weight is applied to every opacity.
 * @param {number} weight
 */
function setWeight(weight: number) {
  RENDERWEIGHT = weight;
}

/**
 * Overrides the current rendering region. Anything that is rendered outside it, won't be rendered.
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
function setRegion(x: number, y: number, w: number, h: number) {
  Render.SetScissorRectangle(x, y, w, h);
}

/**
 * Resets the current rendering region
 */
function resetRegion() {
  Render.PopScissorRectangle();
}

export default {
  line,
  rectangle,
  gradient,
  circle,
  text,
  font,
  getScreenSize,
  setWeight,
  getWeight,
  setRegion,
  resetRegion
};
