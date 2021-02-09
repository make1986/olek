import gql from "graphql-tag";
import { GraphQLSchemaPlugin } from "@webiny/graphql/types";
import { hasScope } from "@webiny/api-security";
import {
    emptyResolver,
    resolveCreate,
    resolveDelete,
    resolveGet,
    resolveList,
    resolveUpdate
} from "@webiny/commodo-graphql";

const leafFetcher = ctx => ctx.models.Leaf;

/**
 * As the name itself suggests, the "graphql-schema" plugin enables us to define our service's GraphQL schema.
 * Use the "schema" and "resolvers" properties to define GraphQL types and resolvers, respectively.
 * Resolvers can be made from scratch, but to make it a bit easier, we rely on a couple of built-in generic
 * resolvers, imported from the "@webiny/commodo-graphql" package.
 *
 * @see https://docs.webiny.com/docs/api-development/graphql
 */
const plugin: GraphQLSchemaPlugin = {
    type: "graphql-schema",
    name: "graphql-schema-leaves",
    schema: {
        typeDefs: gql`
            type LeafDeleteResponse {
                data: Boolean
                error: LeafError
            }

            type LeafCursors {
                next: String
                previous: String
            }

            type LeafListMeta {
                cursors: LeafCursors
                hasNextPage: Boolean
                hasPreviousPage: Boolean
                totalCount: Int
            }

            type LeafError {
                code: String
                message: String
                data: JSON
            }

            type Leaf {
                id: ID
                title: String
                description: String
                isNice: Boolean
                createdOn: DateTime
            }

            input LeafInput {
                id: ID
                title: String!
                description: String
                isNice: Boolean
            }

            input LeafListWhere {
                title: String
                isNice: Boolean
            }

            input LeafListSort {
                title: Int
                isNice: Boolean
                createdOn: Int
            }

            type LeafResponse {
                data: Leaf
                error: LeafError
            }

            type LeafListResponse {
                data: [Leaf]
                meta: LeafListMeta
                error: LeafError
            }

            type LeafQuery {
                getLeaf(id: ID): LeafResponse

                listLeaves(
                    where: LeafListWhere
                    sort: LeafListSort
                    limit: Int
                    after: String
                    before: String
                ): LeafListResponse
            }

            type LeafMutation {
                createLeaf(data: LeafInput!): LeafResponse

                updateLeaf(id: ID!, data: LeafInput!): LeafResponse

                deleteLeaf(id: ID!): LeafDeleteResponse
            }

            extend type Query {
                leaves: LeafQuery
            }

            extend type Mutation {
                leaves: LeafMutation
            }
        `,
        resolvers: {
            Query: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                leaves: emptyResolver
            },
            Mutation: {
                // Needs to be here, otherwise the resolvers below cannot return any result.
                leaves: emptyResolver
            },
            LeafQuery: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                getLeaf: hasScope("leaves:get")(resolveGet(leafFetcher)),
                listLeaves: hasScope("leaves:list")(resolveList(leafFetcher))
            },
            LeafMutation: {
                // With the generic resolvers, we also rely on the "hasScope" helper function from the
                // "@webiny/api-security" package, in order to define the required security scopes (permissions).
                createLeaf: hasScope("leaves:create")(resolveCreate(leafFetcher)),
                updateLeaf: hasScope("leaves:update")(resolveUpdate(leafFetcher)),
                deleteLeaf: hasScope("leaves:delete")(resolveDelete(leafFetcher))
            }
        }
    }
};

export default plugin;
