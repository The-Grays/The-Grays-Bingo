import { IChainHandler, BaseChainHandler } from "./ChainHandler";

export type ColumnRange = {
    max: number;
    min: number;
};

export class BColumnHandler extends BaseChainHandler<ColumnRange, string> {
    constructor(successorHandler: IChainHandler<ColumnRange, string>) {
        super(successorHandler);
    }

    CanHandleRequest(request: string): boolean {
        return request === 'B';
    }

    protected HandleRequest(): ColumnRange {
        return {
            min: 1,
            max: 15
        };
    }
}
export class IColumnHandler extends BaseChainHandler<ColumnRange, string> {
    constructor(successorHandler: IChainHandler<ColumnRange, string>) {
        super(successorHandler);
    }

    CanHandleRequest(request: string): boolean {
        return request === 'I';
    }

    protected HandleRequest(): ColumnRange {
        return {
            min: 16,
            max: 30
        };
    }
}
export class NColumnHandler extends BaseChainHandler<ColumnRange, string> {
    constructor(successorHandler: IChainHandler<ColumnRange, string>) {
        super(successorHandler);
    }

    CanHandleRequest(request: string): boolean {
        return request === 'N';
    }

    protected HandleRequest(): ColumnRange {
        return {
            min: 31,
            max: 45
        };
    }
}
export class GColumnHandler extends BaseChainHandler<ColumnRange, string> {
    constructor(successorHandler: IChainHandler<ColumnRange, string>) {
        super(successorHandler);
    }

    CanHandleRequest(request: string): boolean {
        return request === 'G';
    }

    protected HandleRequest(): ColumnRange {
        return {
            min: 46,
            max: 60
        };
    }
}
export class OColumnHandler extends BaseChainHandler<ColumnRange, string> {
    constructor(successorHandler: IChainHandler<ColumnRange, string>) {
        super(successorHandler);
    }

    CanHandleRequest(request: string): boolean {
        return request === 'O';
    }

    protected HandleRequest(): ColumnRange {
        return {
            min: 61,
            max: 75
        };
    }
}
