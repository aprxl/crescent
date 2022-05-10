import Utils from '../crescent/Utils';

class Animation {
    private _weight = 0;

    public static lerp(a: number, b: number, frac: number): number {
        return a + (b - a) * frac;
    }

    public static lerpRounded(a: number, b: number, frac: number): number {
        return Math.round(Animation.lerp(a, b, frac));
    }

    public static lerpColor(a: number[], b: number[], frac: number): number[] {
        return [
            a[0] + (b[0] - a[0]) * frac,
            a[1] + (b[1] - a[1]) * frac,
            a[2] + (b[2] - a[2]) * frac,
            a[3] + (b[3] - a[3]) * frac
        ]
    }

    public static lerpString(str: string, frac: number): string {
        return str.substring(0, str.length * frac);
    }

    public static approximate(a: number, b: number, speed: number): number {
        return Animation.lerp(a, b, Globals.Frametime() * speed);
    }

    public static approximateColor(a: number[], b: number[], speed: number): number[] {
        return Animation.lerpColor(a, b, Globals.Frametime() * speed);
    }

    public static getTime(): number {
        return Globals.Curtime();
    }

    public static getSin(duration: number): number {
        return Math.sin(Animation.getTime() / duration)
    }

    public static getAbsSin(duration: number): number {
        return Math.abs(Animation.getSin(duration));
    }

    public static getCos(duration: number): number {
        return Math.cos(Animation.getTime() / duration);
    }

    public static getAbsCos(duration: number): number {
        return Math.abs(Animation.getCos(duration));
    }

    public constructor(
        private duration: number
    ) {}

    public get weight(): number {
        return this._weight;
    }

    public set weight(w: number) {
        this._weight = w;
    }

    public get value(): number {
        return Math.pow(this._weight, 3);
    }

    public update(active = true): void {
        const amount = Globals.Frametime() / this.duration;

        this._weight = Utils.clamp(
            this._weight + ( active ? amount : -amount ),
            0,
            1
        );
    }

    public lerp(a: number, b: number): number {
        return a + (b - a) * this.value;
    }

    public lerpRounded(a: number, b: number): number {
        return Math.round(this.lerp(a, b));
    }

    public lerpColor(a: number[], b: number[]): number[] {
        const frac = this.value;

        return [
            a[0] + (b[0] - a[0]) * frac,
            a[1] + (b[1] - a[1]) * frac,
            a[2] + (b[2] - a[2]) * frac,
            a[3] + (b[3] - a[3]) * frac
        ];
    }

    public lerpString(str: string): string {
        return str.substring(0, str.length * this.value);
    }
}

export default Animation;
