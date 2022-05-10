/// Types
type VectorLike = number[];
type VectorOperator = Vector2 | Vector3 | VectorLike | number;

/// Imports
import Utils from './Utils';

/// Classes
class Vector2 {
  protected _x: number;
  protected _y: number;

  public static add(a: Vector2, b: VectorOperator): Vector2 {
    if (isVector2(b) || isVector3(b)) {
      return new Vector2(a.x + b.x, a.y + b.y);
    } else if (isVectorLike(b)) {
      return new Vector2(a.x + b[0], a.y + b[1]);
    } else {
      return new Vector2(a.x + b, a.y + b);
    }
  }

 public static sub(a: Vector2, b: VectorOperator): Vector2 {
    if (isVector2(b) || isVector3(b)) {
      return new Vector2(a.x - b.x, a.y - b.y);
    } else if (isVectorLike(b)) {
      return new Vector2(a.x - b[0], a.y - b[1]);
    } else {
      return new Vector2(a.x - b, a.y - b);
    }
  }

  public static mult(a: Vector2, b: VectorOperator): Vector2 {
    if (isVector2(b) || isVector3(b)) {
      return new Vector2(a.x * b.x, a.y * b.y);
    } else if (isVectorLike(b)) {
      return new Vector2(a.x * b[0], a.y * b[1]);
    } else {
      return new Vector2(a.x * b, a.y * b);
    }
  }

  public static div(a: Vector2, b: VectorOperator): Vector2 {
    if (isVector2(b) || isVector3(b)) {
      return new Vector2(a.x / b.x, a.y / b.y);
    } else if (isVectorLike(b)) {
      return new Vector2(a.x / b[0], a.y / b[1]);
    } else {
      return new Vector2(a.x / b, a.y / b);
    }
  }

  public static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  public static from(xy: VectorLike): Vector2 {
    return new Vector2(xy[0], xy[1]);
  }

  public constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x(): number {
    return this._x;
  }

  public set x(x: number) {
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  public set y(y: number) {
    this._y = y;
  }

  public get xy(): number[] {
    return [this._x, this._y];
  }

  public get object(): { x: number; y: number } {
    return { x: this._x, y: this._y };
  }

  public get objectwh(): { w: number, h: number } {
    return { w: this._x, h: this._y };
  }

  public setX(x: number): Vector2 {
    this._x = x;
    return this;
  }

  public setY(y: number): Vector2 {
    this._y = y;
    return this;
  }

  public offset(x: number, y: number): Vector2 {
    return new Vector2(this._x + x, this._y + y);
  }

  public toString(): string {
    return this.xy.join(', ');
  }

  public length(): number {
    return Math.sqrt(Math.hypot(this._x, this._y));
  }

  public dot(vec: Vector2): number {
    return this._x * vec.x + this._y * vec.y;
  }

  public distance(vec: Vector2): number {
    const sub = new Vector2(vec.x - this._x, vec.y - this._y);
    return sub.length();
  }

  public normalize(): Vector2 {
    const len = this.length();

    if (len === 0) {
      this._x = 0;
      this._y = 0;
    }

    this._x /= len,
    this._y /= len
    return this;
  }

  public normalized(): Vector2 {
    return new Vector2(this._x, this._y).normalize();
  }

  public lerp(destination: Vector2, fraction: number): Vector2 {
    const amount = new Vector2(
      (destination.x - this._x) * fraction,
      (destination.y - this._y) * fraction
    );

    this._x += amount.x;
    this._y += amount.y;
    return this;
  }

  public angleTo(destination: Vector2): Vector2 {
    const sub = new Vector2(destination.x - this._x, destination.y - this._y);

    return new Vector2(
      0,
      Utils.degree(Math.atan2(sub.y, sub.x))
    );
  }
}

class Vector3 {
  protected _x: number;
  protected _y: number;
  protected _z: number;

  public static add(a: Vector3, b: VectorOperator): Vector3 {
    if (isVector3(b)) {
      return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    } else if (isVector2(b)) {
      return new Vector3(a.x + b.x, a.y + b.y, a.z);
    } else if (isVectorLike(b)) {
      return new Vector3(a.x + b[0], a.y + b[1], a.z + (b[2] ?? 0));
    } else {
      return new Vector3(a.x + b, a.y + b, a.z + b);
    }
  }

  public static sub(a: Vector3, b: VectorOperator): Vector3 {
    if (isVector3(b)) {
      return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    } else if (isVector2(b)) {
      return new Vector3(a.x - b.x, a.y - b.y, a.z);
    } else if (isVectorLike(b)) {
      return new Vector3(a.x - b[0], a.y - b[1], a.z - (b[2] ?? 0));
    } else {
      return new Vector3(a.x - b, a.y - b, a.z - b);
    }
  }

  public static mult(a: Vector3, b: VectorOperator): Vector3 {
    if (isVector3(b)) {
      return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    } else if (isVector2(b)) {
      return new Vector3(a.x * b.x, a.y * b.y, a.z);
    } else if (isVectorLike(b)) {
      return new Vector3(a.x * b[0], a.y * b[1], a.z * (b[2] ?? 0));
    } else {
      return new Vector3(a.x * b, a.y * b, a.z * b);
    }
  }

   public static div(a: Vector3, b: VectorOperator): Vector3 {
    if (isVector3(b)) {
      return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
    } else if (isVector2(b)) {
      return new Vector3(a.x / b.x, a.y / b.y, a.z);
    } else if (isVectorLike(b)) {
      return new Vector3(a.x / b[0], a.y / b[1], a.z / (b[2] ?? 0));
    } else {
      return new Vector3(a.x / b, a.y / b, a.z / b);
    }
  }

  public static zero(): Vector3 {
    return new Vector3(0, 0, 0);
  }

  public static from(xyz: VectorLike): Vector3 {
    return new Vector3(xyz[0], xyz[1], xyz[2]);
  }

  public constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public get x(): number {
    return this._x;
  }

  public set x(x: number) {
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  public set y(y: number) {
    this._y = y;
  }

  public get z(): number {
    return this._z;
  }

  public set z(z: number) {
    this._z = z;
  }

  public get xyz(): number[] {
    return [this._x, this._y, this._z];
  }

  public setX(x: number): Vector3 {
    this._x = x;
    return this;
  }

  public setY(y: number): Vector3 {
    this._y = y;
    return this;
  }

  public setZ(z: number): Vector3 {
    this._z = z;
    return this;
  }

  public offset(x: number, y: number, z: number): Vector3 {
    return new Vector3(this._x + x, this._y + y, this._z + z);
  }

  public toString(): string {
    return this.xyz.join(', ');
  }

  public screen(): Vector2 {
    return Vector2.from(Render.WorldToScreen(this.xyz));
  }

  public length(): number {
    return Math.sqrt(Math.hypot(this._x, this._y, this._z));
  }

  public length2d(): number {
    return Math.sqrt(Math.hypot(this._x, this._y));
  }

  public dot(vec: Vector3): number {
    return this._x * vec.x + this._y * vec.y + this._z + vec.z;
  }

  public distance(vec: Vector3): number {
    const sub = new Vector3(vec.x - this._x, vec.y - this._y, vec.z - this._z);
    return sub.length();
  }

  public normalize(): Vector3 {
    const len = this.length();

    if (len === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
    }

    this._x /= len
    this._y /= len
    this._z /= len
    return this;
  }

  public normalized(): Vector3 {
    return new Vector3(this._x, this._y, this._z).normalize();
  }

  public lerp(destination: Vector3, fraction: number): Vector3 {
    const amount = new Vector3(
      (destination.x - this._x) * fraction,
      (destination.y - this._y) * fraction,
      (destination.z - this._z) * fraction
    );

    this._x += amount.x;
    this._y += amount.y;
    this._z += amount.z;
    return this;
  }

  public angleTo(destination: Vector3): Vector3 {
    const sub = new Vector3(
      destination.x - this._x,
      destination.y - this._y,
      destination.z - this._z
    );

    return new Vector3(
      Utils.degree(-Math.atan2(sub.z, Math.hypot(sub.x, sub.y))),
      Utils.degree(Math.atan2(sub.y, sub.x)),
      0
    );
  }
}

/// Functions
function isVector2(x: any): x is Vector2 {
  return x instanceof Vector2;
}

function isVector3(x: any): x is Vector3 {
  return x instanceof Vector3;
}

function isVectorLike(x: any): x is VectorLike {
  return x instanceof Array && typeof x[0] === 'number' && typeof x[1] === 'number';
}

export { Vector2, Vector3 };
