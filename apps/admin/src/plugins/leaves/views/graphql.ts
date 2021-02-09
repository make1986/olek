import gql from "graphql-tag";

export const LIST_LEAVES = gql`
    query ListLeaves(
        $sort: LeafListSort
        $sort: LeafListSort
        $where: LeafListWhere
        $limit: Int
        $after: String
        $before: String
    ) {
        leaves {
            listLeaves(
                sort: $sort
                where: $where
                limit: $limit
                after: $after
                before: $before
            ) {
                data {
                    id
                    title
                    description
                    isNice
                    createdOn
                }
            }
        }
    }
`;

export const CREATE_LEAF = gql`
    mutation CreateLeaf($input: LeafInput!) {
        createLeaf(input: $input) {
            data {
                id
                title
                description
                isNice
                createdOn
            }
            error {
                code
                message
                data
            }
        }
    }
`;

export const READ_LEAF = gql`
    query GetLeaf($id: ID!) {
        leaves {
            leaf: getLeaf(id: $id) {
                data {
                    id
                    title
                    description
                    isNice
                    createdOn
                }
            }
        }
    }
`;

export const DELETE_LEAF = gql`
    mutation DeleteLeaf($id: ID!) {
        deleteLeaf(id: $id) {
            data
            error {
                code
                message
                data
            }
        }
    }
`;

export const UPDATE_LEAF = gql`
    mutation UpdateLeaf($id: ID!, $data: LeafInput!) {
        updateLeaf(id: $id, data: $data) {
            data {
                id
                title
                description
                isNice
                createdOn
            }
            error {
                code
                message
                data
            }
        }
    }
`;
