// We use these fields in every query / mutation below.
const ERROR_FIELDS = /* GraphQL */ `
    {
        code
        message
        data
    }
`;

// A basic create "Leaf" mutation.
export const CREATE_LEAF = /* GraphQL */ `
    mutation CreateLeaf($data: LeafInput!) {
        leaves {
            createLeaf(data: $data) {
                data {
                    id
                    title
                    description
                    isNice
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

// A basic list "Leaves" query.
export const LIST_LEAVES = /* GraphQL */ `
    query ListLeaves(
        $where: LeafListWhere
        $sort: LeafListSort
        $limit: Int
        $after: String
        $before: String
    ) {
        leaves {
            listLeaves(where: $where, sort: $sort, limit: $limit, after: $after, before: $before) {
                data {
                    id
                    title
                    description
                    isNice
                }
                error ${ERROR_FIELDS}

            }
        }
    }
`;
