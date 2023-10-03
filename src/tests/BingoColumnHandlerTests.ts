import { ColumnBHandler, ColumnGHandler, ColumnIHandler, ColumnNHandler, ColumnOHandler, ColumnRange } from "../BingoColumnHandler";
import { DefaultChainHander, IChainHandler } from "../ChainHandler";

test('Handle Returns Correct Range For The B Column', () => {
    const defaultHandler: IChainHandler<ColumnRange, string> = new DefaultChainHander<ColumnRange, string>();
    const sut: IChainHandler<ColumnRange, string> = new ColumnBHandler(defaultHandler);

    expect(sut.Handle('B')).toEqual({ min: 1, max: 15 });
});

test('Handle Returns Correct Range For The I Column', () => {
    const defaultHandler: IChainHandler<ColumnRange, string> = new DefaultChainHander<ColumnRange, string>();
    const sut: IChainHandler<ColumnRange, string> = new ColumnIHandler(defaultHandler);

    expect(sut.Handle('I')).toEqual({ min: 16, max: 30 });
});

test('Handle Returns Correct Range For The N Column', () => {
    const defaultHandler: IChainHandler<ColumnRange, string> = new DefaultChainHander<ColumnRange, string>();
    const sut: IChainHandler<ColumnRange, string> = new ColumnNHandler(defaultHandler);

    expect(sut.Handle('N')).toEqual({ min: 31, max: 45 });
});

test('Handle Returns Correct Range For The G Column', () => {
    const defaultHandler: IChainHandler<ColumnRange, string> = new DefaultChainHander<ColumnRange, string>();
    const sut: IChainHandler<ColumnRange, string> = new ColumnGHandler(defaultHandler);

    expect(sut.Handle('G')).toEqual({ min: 46, max: 60 });
});

test('Handle Returns Correct Range For The O Column', () => {
    const defaultHandler: IChainHandler<ColumnRange, string> = new DefaultChainHander<ColumnRange, string>();
    const sut: IChainHandler<ColumnRange, string> = new ColumnOHandler(defaultHandler);

    expect(sut.Handle('O')).toEqual({ min: 61, max: 75 });
});
