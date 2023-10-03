import { ColumnRange, ColumnBHandler, ColumnIHandler, ColumnNHandler, ColumnGHandler, ColumnOHandler } from "./BingoColumnHandler";
import { DefaultChainHander, IChainHandler } from "./ChainHandler";

function GenerateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenerateCard(): Map<string, number[]> {
    const CARD_SIZE: number = 5;

    // TODO: Get some IOC in here
    const columnChain: IChainHandler<ColumnRange, string> = new ColumnBHandler(new ColumnIHandler(new ColumnNHandler(new ColumnGHandler(new ColumnOHandler(new DefaultChainHander())))));

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
        let newCard: Map<string, number[]>;

        do {
            newCard = GenerateCard();

            if (deck.length === 0)
                break;

            isInvalidCard = validateCard(deck, newCard);
        } while (isInvalidCard);

        deck.push(newCard);
    }

    return deck;
}
function validateCard(deck: Map<string, number[]>[], newCard: Map<string, number[]>) {
    let isInvalidCard: boolean = true;

    for (let i: number = 0; i < deck.length; i++) {
        const card = deck[i];
        let areCardsTheSame: boolean = true;

        newCard.forEach((newCardColumn: number[], key: string) => {
            const cardColumn: number[] = card.get(key) ?? [];

            const areColumnsTheSame = cardColumn.every((cell: number, index: number) => cell === newCardColumn[index]);
            areCardsTheSame = areCardsTheSame && areColumnsTheSame;
        });
        isInvalidCard = isInvalidCard && areCardsTheSame;

        if (!isInvalidCard)
            break;
    }

    return isInvalidCard;
}

