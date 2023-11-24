import players from "./players.json";
import drawDeck from "./DrawingManager";
import printDeck from "./PrintingManager";
import { IBingoDeckGenerator } from "./BingoDeckGenerator";
import EmailManager, { IEmailManager } from "./EmailManager";
import NodeMailerWrapper from "./NodeMailerWrapper";
import BingoDeckGenerator from "./BingoDeckGenerator";
import BingoCardValidator from "./BingoCardValidator";
import BingoCardGenerator from "./BingoCardGenerator";
import RandomNumberGenerator from "./RandomNumberGenerator";

const playerEmails: string[] = players as string[];

async function ProcessDeck(deck: Map<string, number[]>[]) {
    const OUTPUT_DIRECTORY: string = './output';
    const timeStamp: number = Date.now();
    const fileName: string = `Bingo_${timeStamp}`;
    const filePath: string = `${OUTPUT_DIRECTORY}/${fileName}`;

    await drawDeck(deck, OUTPUT_DIRECTORY, fileName);
    const emailManager: IEmailManager = new EmailManager(new NodeMailerWrapper()); // TODO: Get some IoC in here
    emailManager.EmailDeck(playerEmails, deck, filePath);
}

// TODO: Get some IoC in here
const deckGenerator: IBingoDeckGenerator = new BingoDeckGenerator(new BingoCardValidator(), new BingoCardGenerator(new RandomNumberGenerator(Math)));
const deck: Map<string, number[]>[] = deckGenerator.Generate(playerEmails.length);
printDeck(deck);
ProcessDeck(deck);