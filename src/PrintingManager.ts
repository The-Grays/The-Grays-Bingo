function FormatColumn(column: number[]): string[] {
    const options: Intl.NumberFormatOptions = { minimumIntegerDigits: 2 };

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
    for (let i: number = 0; i < bColumn.length; i++) {
        console.log(`   | ${bColumn[i]} | ${iColumn[i]} | ${nColumn[i]} | ${gColumn[i]} | ${oColumn[i]} |`);
    }
    console.log('   --------------------------');
}

export default function PrintDeck(deck: Map<string, number[]>[]) {
    for (let i = 0; i < deck.length; i++) {
        const card = deck[i];

        console.log();
        console.log(`Card: ${i + 1}`);
        PrintCard(card);
    }
    console.log();
}
