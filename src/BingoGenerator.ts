import { ColumnRange, BColumnHandler, IColumnHandler, NColumnHandler, GColumnHandler, OColumnHandler } from "./BingoColumnHandler";
import { DefaultChainHander, IChainHandler } from "./ChainHandler";

function GenerateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenerateCard(): Map<string, number[]> {
    const CARD_SIZE: number = 5;

    // TODO: Get some IOC in here
    const columnChain: IChainHandler<ColumnRange, string> = new BColumnHandler(new IColumnHandler(new NColumnHandler(new GColumnHandler(new OColumnHandler(new DefaultChainHander())))));

    const card: Map<string, number[]> = new Map([
        ['B', []],
        ['I', []],
        ['N', []],
        ['G', []],
        ['O', []]
    ]);

    card.forEach((column: number[], key: string) => {
        const range: ColumnRange = columnChain.Handle(key);

        for (let i: number = 0; i < CARD_SIZE; i++) {
            let cell: number = 0;

            do {
                cell = GenerateRandomNumber(range.min, range.max);
            } while (column.includes(cell));

            column.push(cell);
        }
    });

    return card;
}

export default function GenerateDeck(numberOfCards: number): Map<string, number[]>[] {
    const deck: Map<string, number[]>[] = [];

    for (let i: number = 0; i < numberOfCards; i++) {
        let isInvalidCard: boolean = true;
        let card: Map<string, number[]>;

        do {
            card = GenerateCard();

            if (deck.length === 0)
                isInvalidCard = false;

            for (let i: number = 0; i < deck.length; i++) {
                const element = deck[i];
                let areCardsTheSame: boolean = true;

                card.forEach((cardColumn: number[], key: string) => {
                    const elementColumn: number[] = element.get(key) ?? [];

                    const areColumnsTheSame = elementColumn.every((cell: number, index: number) => cell === cardColumn[index]);
                    areCardsTheSame = areCardsTheSame && areColumnsTheSame;
                });
                isInvalidCard = isInvalidCard && areCardsTheSame;

                if (!isInvalidCard)
                    break;
            }
        } while (isInvalidCard);

        deck.push(card);
    }

    return deck;
}
