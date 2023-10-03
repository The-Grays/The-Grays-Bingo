import { expect, test } from '@jest/globals';
import { BaseChainHandler, DefaultChainHander, IChainHandler } from "../ChainHandler";

test('Default CanHandleRequest Returns True', () => {
    const sut: IChainHandler<string, string> = new DefaultChainHander<string, string>();

    expect(sut.CanHandleRequest('')).toBe(true);
});

test('Default Handle Throws Exception', () => {
    const sut: IChainHandler<string, string> = new DefaultChainHander<string, string>();

    expect(() => sut.Handle('')).toThrow();
});

test('Handle Returns Handled By A When Passed A', () => {
    class HandlerA extends BaseChainHandler<string, string> {
        CanHandleRequest(request: string): boolean {
            return request === 'A';
        }

        protected HandleRequest(): string {
            return "Handled by A.";
        }
    }

    class HandlerB extends BaseChainHandler<string, string> {
        CanHandleRequest(request: string): boolean {
            return request === 'B';
        }

        protected HandleRequest(): string {
            return "Handled by B.";
        }
    }

    const defaultHandler: IChainHandler<string, string> = new DefaultChainHander<string, string>();
    const handlerA: IChainHandler<string, string> = new HandlerA(defaultHandler);
    const sut: IChainHandler<string, string> = new HandlerB(handlerA);

    expect(sut.Handle('A')).toBe('Handled by A.');
});

test('Handle Returns Handled By B When Passed B', () => {
    class HandlerA extends BaseChainHandler<string, string> {
        CanHandleRequest(request: string): boolean {
            return request === 'A';
        }

        protected HandleRequest(): string {
            return "Handled by A.";
        }
    }

    class HandlerB extends BaseChainHandler<string, string> {
        CanHandleRequest(request: string): boolean {
            return request === 'B';
        }

        protected HandleRequest(): string {
            return "Handled by B.";
        }
    }

    const defaultHandler: IChainHandler<string, string> = new DefaultChainHander<string, string>();
    const handlerA: IChainHandler<string, string> = new HandlerA(defaultHandler);
    const sut: IChainHandler<string, string> = new HandlerB(handlerA);

    expect(sut.Handle('B')).toBe('Handled by B.');
});

test('Handle Throws When There Is No Handler', () => {
    const sut: IChainHandler<string, string> = new DefaultChainHander<string, string>();

    expect(() => sut.Handle('C')).toThrow();
});