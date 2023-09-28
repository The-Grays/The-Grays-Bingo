import * as canvas from "canvas";
import fs from "fs";
import nodemailer from "nodemailer";
import email_config from "./email_config.json";

const CARD_SIZE: number = 5;

function GenerateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function GenerateCard(): Map<string, number[]> {
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

        for(let i: number = 0; i < CARD_SIZE; i++) {
            let cell: number = 0;

            do {
                cell = GenerateRandomNumber(min, max);
            } while(column.includes(cell));

            column.push(cell);
        }
    });

    return card;
}

function FormatColumn(column: number[]): string[] {
    const options:Intl.NumberFormatOptions = {minimumIntegerDigits: 2};

    return column.map((cell: number) => cell.toLocaleString(undefined, options));
}

function PrintCard(card: Map<string, number[]>) {
    const bColumn: string[] = FormatColumn(card.get('B') ?? []);
    const iColumn: string[] = FormatColumn(card.get('I') ?? []);
    const nColumn: string[] = FormatColumn(card.get('N') ?? []);
    const gColumn: string[] = FormatColumn(card.get('G') ?? []);
    const oColumn: string[] = FormatColumn(card.get('O') ?? []);

    console.log('     B    I    N    G    O');
    console.log('   __________________________');
    for (let i: number = 0; i < CARD_SIZE; i++) {
        console.log(`   | ${bColumn[i]} | ${iColumn[i]} | ${nColumn[i]} | ${gColumn[i]} | ${oColumn[i]} |`);
    }
    console.log('   --------------------------');
}

function GenerateDeck(numberOfCards: number): Map<string, number[]>[] {
    const deck: Map<string, number[]>[] = [];

    for (let i: number = 0; i < numberOfCards; i++) {
        let isInvalidCard: boolean = true;
        let card: Map<string, number[]>;

        do {
            card = GenerateCard();

            if(deck.length === 0)
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

                if(!isInvalidCard)
                    break;
            }
        } while(isInvalidCard);

        deck.push(card);
    }

    return deck;
}

function PrintDeck(deck: Map<string, number[]>[]) {
    for (let i = 0; i < deck.length; i++) {
        const card = deck[i];

        console.log();
        console.log(`Card: ${i + 1}`);
        PrintCard(card);
    }
    console.log();
}

class Coordinate {
    x: number;
    y: number;

    constructor(x: number, y: number ) {
        this.x = x;
        this.y = y;
    }
}

function DrawGrid(context: canvas.CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(50, 120);

    //TODO: Move grid coordinates into a JSON file
    const gridCoordinates: Coordinate[] = [
        new Coordinate(425, 120),
        new Coordinate(425, 425),
        new Coordinate(50, 425),
        new Coordinate(50, 120),
        new Coordinate(125, 120),
        new Coordinate(125, 425),
        new Coordinate(200, 425),
        new Coordinate(200, 120),
        new Coordinate(275, 120),
        new Coordinate(275, 425),
        new Coordinate(350, 425),
        new Coordinate(350, 120),
        new Coordinate(425, 120),
        new Coordinate(425, 425),
        new Coordinate(425, 345),
        new Coordinate(50, 345),
        new Coordinate(50, 270),
        new Coordinate(425, 270),
        new Coordinate(425, 195),
        new Coordinate(50, 195),
        new Coordinate(50, 120),
        new Coordinate(425, 120),
        new Coordinate(425, 500),
        new Coordinate(50, 500),
        new Coordinate(50, 425),
        new Coordinate(125, 425),
        new Coordinate(125, 500),
        new Coordinate(200, 500),
        new Coordinate(200, 425),
        new Coordinate(275, 425),
        new Coordinate(275, 500),
        new Coordinate(350, 500),
        new Coordinate(350, 425),
        new Coordinate(350, 500)
    ];

    for (let i: number = 0; i < gridCoordinates.length; i++) {
        const coordinate: Coordinate = gridCoordinates[i];
        context.lineTo(coordinate.x, coordinate.y);
        context.stroke();
    }
}

async function DrawCard(card: Map<string, number[]>, fileName: string) {
    const canvasWidth: number = 475;
    const canvasHeight: number = 550;

    const cardImage: canvas.Canvas = canvas.createCanvas(canvasWidth, canvasHeight);
    const context: canvas.CanvasRenderingContext2D = cardImage.getContext('2d');

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = '#A9A9A9';
    context.font = "bold 15pt 'PT Sans'";
    context.fillText('The Grays', 195, 50);

    const image = await canvas.loadImage('./src/assets/gray.png');
    context.drawImage(image, 150, 25, 25, 25);
    context.drawImage(image, 295, 25, 25, 25);

    context.font = "bold 30pt 'PT Sans'";
    context.fillText('B      I     N     G     O', 75, 100);

    context.font = "bold 44pt 'PT Sans'";
    let x: number = 55;
    let y: number;
    card.forEach((cardColumn: number[]) => {
        y = 180;
        for (let i: number = 0; i < cardColumn.length; i++) {
            const cell: number = cardColumn[i];
            context.fillText(cell.toString(), x, y);
            y += 75;
        }
        x += 75;
    });

    DrawGrid(context);

    const buffer = cardImage.toBuffer('image/png')
    fs.writeFileSync(fileName, buffer)
}

async function SendMail(fileName: string) {
    const transporter = nodemailer.createTransport(email_config);

      const info = await transporter.sendMail({
        from: '"The Gray\'s Bingo" <bingo@TheGrays.com>',
        to: "timking@bigkinglsu.com", // TODO: get email addresses from JSON file
        subject: "The Gray\'s Bingo Card",
        text: "See attached\n\n",
        html: "<strong>See attached</strong></br></br>",
        headers: { 'x-cloudmta-class': 'standard' },
        attachments: [{ path: `${fileName}.html` }, { path: `${fileName}.png` }]
      });
    
      console.log("Message sent: %s", info.response);
}

async function DrawDeck(deck: Map<string, number[]>[]) {
    const timeStamp: number = Date.now();
    const template: string = fs.readFileSync('./src/bingo_template.html', 'utf-8');
    const outputDirectory: string = './output';

    if(!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
    }

    for (let i: number = 0; i < deck.length; i++) {
        const card: Map<string, number[]> = deck[i];
        const fileName: string = `Bingo_${timeStamp}_${i}`;
        await DrawCard(card, `${outputDirectory}/${fileName}.png`);
        fs.writeFileSync(`${outputDirectory}/${fileName}.html`, template.replace("{{card_file_name}}", `${fileName}.png`));
        SendMail(`${outputDirectory}/${fileName}`);
    }
}

const deck: Map<string, number[]>[] = GenerateDeck(1);
PrintDeck(deck);
DrawDeck(deck);