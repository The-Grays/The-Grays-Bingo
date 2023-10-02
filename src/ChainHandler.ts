 export interface IChainHandler<TResponse, TRequest> {
    CanHandleRequest(request: TRequest): boolean;
    Handle(request: TRequest): TResponse;
}

export abstract class BaseChainHandler<TResponse, TRequest> implements IChainHandler<TResponse, TRequest> {
    private readonly successorHandler: IChainHandler<TResponse, TRequest>;

    constructor(successorHandler: IChainHandler<TResponse, TRequest>) {
        this.successorHandler = successorHandler;
    }

    Handle(request: TRequest): TResponse {
        const canHandleThisRequest: boolean = this.CanHandleRequest(request);

        if (canHandleThisRequest) {
            return this.HandleRequest(request);
        }

        return this.successorHandler.Handle(request);
    }

    abstract CanHandleRequest(request: TRequest): boolean;

    protected abstract HandleRequest(request: TRequest): TResponse;
}

export class DefaultChainHander<TResponse, TRequest> implements IChainHandler<TResponse, TRequest> {
    CanHandleRequest(): boolean {
        return true;
    }

    Handle(): TResponse {
        throw new Error("No available handler.");
    }
}