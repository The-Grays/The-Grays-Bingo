import players from "./players.json";
import drawDeck from "./DrawingManager";
import printDeck from "./PrintingManager";
import generateDeck from "./BingoGenerator";
import EmailManager, { IEmailManager } from "./EmailManager";

async function ProcessDeck(deck: Map<string, number[]>[]) {
    const OUTPUT_DIRECTORY: string = './output';
    const timeStamp: number = Date.now();
    const fileName: string = `Bingo_${timeStamp}`;
    const filePath: string = `${OUTPUT_DIRECTORY}/${fileName}`;

    await drawDeck(deck, OUTPUT_DIRECTORY, fileName);
    const emailManager: IEmailManager = new EmailManager(); // TODO: Get some IoC in here
    emailManager.EmailDeck(players, deck, filePath);
}

const deck: Map<string, number[]>[] = generateDeck(players.length);
printDeck(deck);
ProcessDeck(deck);