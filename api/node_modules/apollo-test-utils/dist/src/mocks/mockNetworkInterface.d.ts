import { NetworkInterface, BatchedNetworkInterface, Request, SubscriptionNetworkInterface } from 'apollo-client/transport/networkInterface';
import { ExecutionResult, DocumentNode } from 'graphql';
export declare function mockNetworkInterface(...mockedResponses: MockedResponse[]): NetworkInterface;
export declare function mockSubscriptionNetworkInterface(mockedSubscriptions: MockedSubscription[], ...mockedResponses: MockedResponse[]): MockSubscriptionNetworkInterface;
export declare function mockBatchedNetworkInterface(...mockedResponses: MockedResponse[]): BatchedNetworkInterface;
export interface ParsedRequest {
    variables?: Object;
    query?: DocumentNode;
    debugName?: string;
}
export interface MockedResponse {
    request: ParsedRequest;
    result?: ExecutionResult;
    error?: Error;
    delay?: number;
}
export interface MockedSubscriptionResult {
    result?: ExecutionResult;
    error?: Error;
    delay?: number;
}
export interface MockedSubscription {
    request: ParsedRequest;
    results?: MockedSubscriptionResult[];
    id?: number;
}
export declare class MockNetworkInterface implements NetworkInterface {
    private mockedResponsesByKey;
    constructor(mockedResponses: MockedResponse[]);
    addMockedResponse(mockedResponse: MockedResponse): void;
    query(request: Request): Promise<{}>;
}
export declare class MockSubscriptionNetworkInterface extends MockNetworkInterface implements SubscriptionNetworkInterface {
    mockedSubscriptionsByKey: {
        [key: string]: MockedSubscription[];
    };
    mockedSubscriptionsById: {
        [id: number]: MockedSubscription;
    };
    handlersById: {
        [id: number]: (error: any, result: any) => void;
    };
    subId: number;
    constructor(mockedSubscriptions: MockedSubscription[], mockedResponses: MockedResponse[]);
    generateSubscriptionId(): number;
    addMockedSubscription(mockedSubscription: MockedSubscription): void;
    subscribe(request: Request, handler: (error: any, result: any) => void): number;
    fireResult(id: number): void;
    unsubscribe(id: number): void;
}
export declare class MockBatchedNetworkInterface extends MockNetworkInterface implements BatchedNetworkInterface {
    batchQuery(requests: Request[]): Promise<ExecutionResult[]>;
}
