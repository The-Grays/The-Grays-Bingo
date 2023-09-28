function GenerateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenerateCard(): Map<string, number[]> {
    const CARD_SIZE: number = 5;

    const card: Map<string, number[]> = new Map([
        ['B', []],
        ['I', []],
        ['N', []],
        ['G', []],
        ['O', []]
    ]);

    card.forEach((column: number[], key: string) => {
        let min: number = 0;
        let max: number = 0;

        switch (key) {
            case 'B':
                min = 1;
                max = 15;
                break;

            case 'I':
                min = 16;
                max = 30;
                break;

            case 'N':
                min = 31;
                max = 45;
                break;

            case 'G':
                min = 46;
                max = 60;
                break;

            case 'O':
                min = 61;
                max = 75;
                break;

            default:
                console.error('Invalid Board');
                break;
        }

        for (let i: number = 0; i < CARD_SIZE; i++) {
            let cell: number = 0;

            do {
                cell = GenerateRandomNumber(min, max);
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
