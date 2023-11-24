export interface IRandomNumberGenerator {
    Generate(min: number, max: number): number;
}

export default class RandomNumberGenerator implements IRandomNumberGenerator {
    private readonly math: Math;

    constructor(math: Math) {
        this.math = math;
    }

    Generate(min: number, max: number): number {
        return this.math.floor(this.math.random() * (max - min + 1)) + min;
    }
}