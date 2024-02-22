"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
function mockNetworkInterface() {
    var mockedResponses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mockedResponses[_i] = arguments[_i];
    }
    return new MockNetworkInterface(mockedResponses);
}
exports.mockNetworkInterface = mockNetworkInterface;
function mockSubscriptionNetworkInterface(mockedSubscriptions) {
    var mockedResponses = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        mockedResponses[_i - 1] = arguments[_i];
    }
    return new MockSubscriptionNetworkInterface(mockedSubscriptions, mockedResponses);
}
exports.mockSubscriptionNetworkInterface = mockSubscriptionNetworkInterface;
function mockBatchedNetworkInterface() {
    var mockedResponses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mockedResponses[_i] = arguments[_i];
    }
    return new MockBatchedNetworkInterface(mockedResponses);
}
exports.mockBatchedNetworkInterface = mockBatchedNetworkInterface;
var MockNetworkInterface = (function () {
    function MockNetworkInterface(mockedResponses) {
        var _this = this;
        this.mockedResponsesByKey = {};
        mockedResponses.forEach(function (mockedResponse) {
            _this.addMockedResponse(mockedResponse);
        });
    }
    MockNetworkInterface.prototype.addMockedResponse = function (mockedResponse) {
        var key = requestToKey(mockedResponse.request);
        var mockedResponses = this.mockedResponsesByKey[key];
        if (!mockedResponses) {
            mockedResponses = [];
            this.mockedResponsesByKey[key] = mockedResponses;
        }
        mockedResponses.push(mockedResponse);
    };
    MockNetworkInterface.prototype.query = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parsedRequest = {
                query: request.query,
                variables: request.variables,
                debugName: request.debugName,
            };
            var key = requestToKey(parsedRequest);
            var responses = _this.mockedResponsesByKey[key];
            if (!responses || responses.length === 0) {
                throw new Error("No more mocked responses for the query: " + graphql_1.print(request.query) + ", variables: " + JSON.stringify(request.variables));
            }
            var _a = responses.shift(), result = _a.result, error = _a.error, delay = _a.delay;
            if (!result && !error) {
                throw new Error("Mocked response should contain either result or error: " + key);
            }
            setTimeout(function () {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            }, delay ? delay : 0);
        });
    };
    return MockNetworkInterface;
}());
exports.MockNetworkInterface = MockNetworkInterface;
var MockSubscriptionNetworkInterface = (function (_super) {
    __extends(MockSubscriptionNetworkInterface, _super);
    function MockSubscriptionNetworkInterface(mockedSubscriptions, mockedResponses) {
        var _this = _super.call(this, mockedResponses) || this;
        _this.mockedSubscriptionsByKey = {};
        _this.mockedSubscriptionsById = {};
        _this.handlersById = {};
        _this.subId = 0;
        mockedSubscriptions.forEach(function (sub) {
            _this.addMockedSubscription(sub);
        });
        return _this;
    }
    MockSubscriptionNetworkInterface.prototype.generateSubscriptionId = function () {
        var requestId = this.subId;
        this.subId++;
        return requestId;
    };
    MockSubscriptionNetworkInterface.prototype.addMockedSubscription = function (mockedSubscription) {
        var key = requestToKey(mockedSubscription.request);
        if (mockedSubscription.id === undefined) {
            mockedSubscription.id = this.generateSubscriptionId();
        }
        var mockedSubs = this.mockedSubscriptionsByKey[key];
        if (!mockedSubs) {
            mockedSubs = [];
            this.mockedSubscriptionsByKey[key] = mockedSubs;
        }
        mockedSubs.push(mockedSubscription);
    };
    MockSubscriptionNetworkInterface.prototype.subscribe = function (request, handler) {
        var parsedRequest = {
            query: request.query,
            variables: request.variables,
            debugName: request.debugName,
        };
        var key = requestToKey(parsedRequest);
        if (this.mockedSubscriptionsByKey.hasOwnProperty(key)) {
            var subscription = this.mockedSubscriptionsByKey[key].shift();
            var id = subscription.id;
            this.handlersById[id] = handler;
            this.mockedSubscriptionsById[id] = subscription;
            return id;
        }
        else {
            throw new Error('Network interface does not have subscription associated with this request.');
        }
    };
    ;
    MockSubscriptionNetworkInterface.prototype.fireResult = function (id) {
        var handler = this.handlersById[id];
        if (this.mockedSubscriptionsById.hasOwnProperty(id.toString())) {
            var subscription = this.mockedSubscriptionsById[id];
            if (subscription.results.length === 0) {
                throw new Error("No more mocked subscription responses for the query: " +
                    (graphql_1.print(subscription.request.query) + ", variables: " + JSON.stringify(subscription.request.variables)));
            }
            var response_1 = subscription.results.shift();
            setTimeout(function () {
                handler(response_1.error, response_1.result);
            }, response_1.delay ? response_1.delay : 0);
        }
        else {
            throw new Error('Network interface does not have subscription associated with this id.');
        }
    };
    MockSubscriptionNetworkInterface.prototype.unsubscribe = function (id) {
        delete this.mockedSubscriptionsById[id];
    };
    return MockSubscriptionNetworkInterface;
}(MockNetworkInterface));
exports.MockSubscriptionNetworkInterface = MockSubscriptionNetworkInterface;
var MockBatchedNetworkInterface = (function (_super) {
    __extends(MockBatchedNetworkInterface, _super);
    function MockBatchedNetworkInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockBatchedNetworkInterface.prototype.batchQuery = function (requests) {
        var _this = this;
        var resultPromises = [];
        requests.forEach(function (request) {
            resultPromises.push(_this.query(request));
        });
        return Promise.all(resultPromises);
    };
    return MockBatchedNetworkInterface;
}(MockNetworkInterface));
exports.MockBatchedNetworkInterface = MockBatchedNetworkInterface;
function requestToKey(request) {
    var queryString = request.query && graphql_1.print(request.query);
    return JSON.stringify({
        variables: request.variables || {},
        debugName: request.debugName,
        query: queryString,
    });
}
//# sourceMappingURL=mockNetworkInterface.js.map