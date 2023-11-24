export default class MathFixture implements Math {
    E!: number;
    LN10!: number;
    LN2!: number;
    LOG2E!: number;
    LOG10E!: number;
    PI!: number;
    SQRT1_2!: number;
    SQRT2!: number;
    abs(x: number): number {
        throw new Error("Method not implemented.");
    }
    acos(x: number): number {
        throw new Error("Method not implemented.");
    }
    asin(x: number): number {
        throw new Error("Method not implemented.");
    }
    atan(x: number): number {
        throw new Error("Method not implemented.");
    }
    atan2(y: number, x: number): number {
        throw new Error("Method not implemented.");
    }
    ceil(x: number): number {
        throw new Error("Method not implemented.");
    }
    cos(x: number): number {
        throw new Error("Method not implemented.");
    }
    exp(x: number): number {
        throw new Error("Method not implemented.");
    }
    floor(x: number): number {
        return Math.floor(x);
    }
    log(x: number): number {
        throw new Error("Method not implemented.");
    }
    max(...values: number[]): number {
        throw new Error("Method not implemented.");
    }
    min(...values: number[]): number {
        throw new Error("Method not implemented.");
    }
    pow(x: number, y: number): number {
        throw new Error("Method not implemented.");
    }
    random(): number {
        return .5;
    }
    round(x: number): number {
        throw new Error("Method not implemented.");
    }
    sin(x: number): number {
        throw new Error("Method not implemented.");
    }
    sqrt(x: number): number {
        throw new Error("Method not implemented.");
    }
    tan(x: number): number {
        throw new Error("Method not implemented.");
    }
    clz32(x: number): number {
        throw new Error("Method not implemented.");
    }
    imul(x: number, y: number): number {
        throw new Error("Method not implemented.");
    }
    sign(x: number): number {
        throw new Error("Method not implemented.");
    }
    log10(x: number): number {
        throw new Error("Method not implemented.");
    }
    log2(x: number): number {
        throw new Error("Method not implemented.");
    }
    log1p(x: number): number {
        throw new Error("Method not implemented.");
    }
    expm1(x: number): number {
        throw new Error("Method not implemented.");
    }
    cosh(x: number): number {
        throw new Error("Method not implemented.");
    }
    sinh(x: number): number {
        throw new Error("Method not implemented.");
    }
    tanh(x: number): number {
        throw new Error("Method not implemented.");
    }
    acosh(x: number): number {
        throw new Error("Method not implemented.");
    }
    asinh(x: number): number {
        throw new Error("Method not implemented.");
    }
    atanh(x: number): number {
        throw new Error("Method not implemented.");
    }
    hypot(...values: number[]): number {
        throw new Error("Method not implemented.");
    }
    trunc(x: number): number {
        throw new Error("Method not implemented.");
    }
    fround(x: number): number {
        throw new Error("Method not implemented.");
    }
    cbrt(x: number): number {
        throw new Error("Method not implemented.");
    }
    [Symbol.toStringTag]!: string;

}
