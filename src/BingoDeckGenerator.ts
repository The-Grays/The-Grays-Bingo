import { IBingoCardGenerator } from "./BingoCardGenerator";
import IValidator from "./IValidator";

export interface IBingoDeckGenerator {
    Generate(numberOfCards: number): Map<string, number[]>[];
}

export default class BingoDeckGenerator implements IBingoDeckGenerator {
    private readonly cardValidator: IValidator<Map<string, number[]>, Map<string, number[]>[]>;
    private readonly cardGenerator: IBingoCardGenerator;

    constructor(cardValidator: IValidator<Map<string, number[]>, Map<string, number[]>[]>, cardGenerator: IBingoCardGenerator) {
        this.cardValidator = cardValidator;
        this.cardGenerator = cardGenerator;
    }

    Generate(numberOfCards: number): Map<string, number[]>[] {
        const deck: Map<string, number[]>[] = [];

        for (let i: number = 0; i < numberOfCards; i++) {
            let isInvalidCard: boolean = true;
            let newCard: Map<string, number[]>;

            do {
                newCard = this.cardGenerator.Generate();

                if (deck.length === 0)
                    break;

                isInvalidCard = this.cardValidator.Validate(newCard, deck);
            } while (isInvalidCard);

            deck.push(newCard);
        }

        return deck;
    }
}