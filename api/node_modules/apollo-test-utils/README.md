# apollo-test-utils

[![Greenkeeper badge](https://badges.greenkeeper.io/apollographql/apollo-test-utils.svg)](https://greenkeeper.io/)

This is a very rudimentary package that currently only exports functions for mocking an Apollo Client network interface. Here's an example for how to use it:

```js
  import ApolloClient from 'apollo-client';
  import gql from 'graphql-tag';
  import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
  import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';

  const typeDefs = `
      type User {
        id: Int
        name: String
      }

      type Query {
        user: User
      }
    `;

  const schema = makeExecutableSchema({ typeDefs });
  addMockFunctionsToSchema({ schema });

  const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

  const client = new ApolloClient({
    networkInterface: mockNetworkInterface,
  });

  client.query({
    query: gql`{ user { name } }`,
  });

```
