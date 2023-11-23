import bingoColumnHandler, { ColumnRange } from "./BingoColumnHandler";
import { IRandomNumberGenerator } from "./RandomNumberGenerator";

export interface IBingoCardGenerator {
    Generate(): Map<string, number[]>;
}

export default class BingoCardGenerator implements IBingoCardGenerator {
    private readonly randomNumberGenerator: IRandomNumberGenerator;

    constructor(randomNumberGenerator: IRandomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    Generate(): Map<string, number[]> {
        const card: Map<string, number[]> = new Map([
            ['B', []],
            ['I', []],
            ['N', []],
            ['G', []],
            ['O', []]
        ]);

        card.forEach((column: number[], key: string) => {
            const range: ColumnRange = bingoColumnHandler.Handle(key);

            // assuming a bingo card is a square grid then number of rows should equal number of columns
            for (let i: number = 0; i < card.size; i++) {
                let cell: number = 0;

                do {
                    cell = this.randomNumberGenerator.Generate(range.min, range.max);
                } while (column.includes(cell));

                column.push(cell);
            }
        });

        return card;
    }
}