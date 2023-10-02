import * as canvas from "canvas";
import fs from "fs";
import gridCoordinates from "./grid_coordinates.json";

type Coordinate = {
    x: number;
    y: number;
};

function DrawGrid(context: canvas.CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(50, 120);

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

    const buffer = cardImage.toBuffer('image/png');
    fs.writeFileSync(fileName, buffer);
}

export default async function DrawDeck(deck: Map<string, number[]>[], path: string, fileName: string) {
    const template: string = fs.readFileSync('./src/bingo_template.html', 'utf-8');
    const CARD_FILE_NAME: string = "{{card_file_name}}";

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    for (let i: number = 0; i < deck.length; i++) {
        const card: Map<string, number[]> = deck[i];
        const filePath: string = `${path}/${fileName}_${i}`;
        await DrawCard(card, `${filePath}.png`);
        fs.writeFileSync(`${filePath}.html`, template.replace(CARD_FILE_NAME, `${fileName}_${i}.png`));
    }
}
