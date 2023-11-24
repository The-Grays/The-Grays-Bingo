import RandomNumberGenerator, { IRandomNumberGenerator } from "../RandomNumberGenerator";
import MathFixture from "./Fixtures/MathFixture";

test('Generate returns a number between the min and max', () => {
    const sut: IRandomNumberGenerator = new RandomNumberGenerator(new MathFixture());

    const actual: number = sut.Generate(1, 2);

    expect(actual).toEqual(2);
});