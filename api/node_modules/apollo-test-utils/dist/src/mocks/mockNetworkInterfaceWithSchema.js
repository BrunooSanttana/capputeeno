"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
function mockNetworkInterfaceWithSchema(options) {
    return {
        query: function (request) {
            return graphql_1.graphql(options.schema, graphql_1.print(request.query), {}, {}, request.variables, request.operationName);
        },
    };
}
exports.mockNetworkInterfaceWithSchema = mockNetworkInterfaceWithSchema;
//# sourceMappingURL=mockNetworkInterfaceWithSchema.js.map