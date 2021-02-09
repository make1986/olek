import useGqlHandler from "./useGqlHandler";
import { CREATE_LEAF, LIST_LEAVES } from "./graphql/leaves";

/**
 * This is a simple test that asserts basic CRUD operations work as expected.
 * Feel free to update this test according to changes you made in the actual code.
 *
 * @see https://docs.webiny.com/docs/api-development/introduction
 */
describe("CRUD Test", () => {
    const { invoke } = useGqlHandler();

    it("should be able to perform basic CRUD operations", async () => {
        // 1. Let's create a couple of leaves.
        let [leaf1] = await invoke({
            body: {
                query: CREATE_LEAF,
                variables: {
                    data: {
                        title: "Leaf 1",
                        description: "This is my 1st leaf.",
                        isNice: false
                    }
                }
            }
        });

        let [leaf2] = await invoke({
            body: {
                query: CREATE_LEAF,
                variables: {
                    data: { title: "Leaf 2", description: "This is my 2nd leaf." }
                }
            }
        });

        let [leaf3] = await invoke({
            body: {
                query: CREATE_LEAF,
                variables: {
                    data: { title: "Leaf 3", isNice: true }
                }
            }
        });

        // 2. Now that we have leaves created, let's see if they come up in a basic listLeaves query.
        let [leavesList] = await invoke({
            body: {
                query: LIST_LEAVES
            }
        });

        expect(leavesList).toEqual({
            data: {
                leaves: {
                    listLeaves: {
                        data: [
                            {
                                id: leaf3.data.leaves.createLeaf.data.id,
                                title: "Leaf 3",
                                description: null,
                                isNice: true
                            },
                            {
                                id: leaf2.data.leaves.createLeaf.data.id,
                                title: "Leaf 2",
                                description: "This is my 2nd leaf.",
                                isNice: true
                            },
                            {
                                id: leaf1.data.leaves.createLeaf.data.id,
                                title: "Leaf 1",
                                description: "This is my 1st leaf.",
                                isNice: false
                            }
                        ],
                        error: null
                    }
                }
            }
        });
    });

    it("should throw a validation error if title is invalid", async () => {
        // The title field is missing, the error should be thrown from the GraphQL and the resolver won't be executedd.
        let [body] = await invoke({
            body: {
                query: CREATE_LEAF,
                variables: {
                    data: { description: "This is my 1st leaf.", isNice: false }
                }
            }
        });

        let [error] = body.errors;
        expect(error.message).toBe(
            'Variable "$data" got invalid value { description: "This is my 1st leaf.", isNice: false }; Field title of required type String! was not provided.'
        );

        // Even though the title is provided, it is still too short (because of the validation
        // set on the "Leaf" Commodo model).
        [body] = await invoke({
            body: {
                query: CREATE_LEAF,
                variables: {
                    data: { title: "Aa", description: "This is my 1st leaf.", isNice: false }
                }
            }
        });

        expect(body).toEqual({
            data: {
                leaves: {
                    createLeaf: {
                        data: null,
                        error: {
                            code: "VALIDATION_FAILED_INVALID_FIELDS",
                            message: "Validation failed.",
                            data: {
                                invalidFields: {
                                    title: "Value requires at least 3 characters."
                                }
                            }
                        }
                    }
                }
            }
        });
    });
});
