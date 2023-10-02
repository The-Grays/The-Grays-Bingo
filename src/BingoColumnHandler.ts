import { BaseChainHandler } from "./ChainHandler";

export type ColumnRange = {
    max: number;
    min: number;
};

abstract class BaseColumnHandler extends BaseChainHandler<ColumnRange, string> {
    protected abstract Column: string;

    CanHandleRequest(request: string): boolean {
        return request === this.Column;
    }
}

export class ColumnBHandler extends BaseColumnHandler {
    protected readonly Column: string = 'B';

    protected HandleRequest(): ColumnRange {
        return {
            min: 1,
            max: 15
        };
    }
}

export class ColumnIHandler extends BaseColumnHandler {
    protected readonly Column: string = 'I';

    protected HandleRequest(): ColumnRange {
        return {
            min: 16,
            max: 30
        };
    }
}

export class ColumnNHandler extends BaseColumnHandler {
    protected readonly Column: string = 'N';

    protected HandleRequest(): ColumnRange {
        return {
            min: 31,
            max: 45
        };
    }
}

export class ColumnGHandler extends BaseColumnHandler {
    protected readonly Column: string = 'G';

    protected HandleRequest(): ColumnRange {
        return {
            min: 46,
            max: 60
        };
    }
}

export class ColumnOHandler extends BaseColumnHandler {
    protected readonly Column: string = 'O';

    protected HandleRequest(): ColumnRange {
        return {
            min: 61,
            max: 75
        };
    }
}
