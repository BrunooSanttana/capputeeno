import { NetworkInterface } from 'apollo-client/transport/networkInterface';
import { GraphQLSchema } from 'graphql';
export declare function mockNetworkInterfaceWithSchema(options: {
    schema: GraphQLSchema;
}): NetworkInterface;
