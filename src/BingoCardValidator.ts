import IValidator from "./IValidator";

export default class BingoCardValidator implements IValidator<Map<string, number[]>, Map<string, number[]>[]> {
    Validate(newCard: Map<string, number[]>, deck: Map<string, number[]>[]): boolean {
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
}