import * as React from "react";
import { pick } from "lodash";
import { SplitView, LeftPanel, RightPanel } from "@webiny/app-admin/components/SplitView";
import { FloatingActionButton } from "@webiny/app-admin/components/FloatingActionButton";
import LeavesDataList from "./LeavesDataList";
import LeavesForm from "./LeafForm";
import { READ_LEAF, LIST_LEAVES, CREATE_LEAF, UPDATE_LEAF, DELETE_LEAF } from "./graphql";
import { CrudProvider } from "@webiny/app-admin/contexts/Crud";

const Leaves = ({ scopes, formProps, listProps }: any) => {
    const variables = data => ({
        data: {
            ...pick(data, ["title", "description", "isNice"])
        }
    });

    return (
        <React.Fragment>
            <CrudProvider
                delete={DELETE_LEAF}
                read={READ_LEAF}
                list={{
                    query: LIST_LEAVES,
                    variables: { sort: { savedOn: -1 } }
                }}
                update={{
                    mutation: UPDATE_LEAF,
                    variables
                }}
                create={{
                    mutation: CREATE_LEAF,
                    variables
                }}
            >
                {({ actions }) => (
                    <>
                        <SplitView>
                            <LeftPanel>
                                <LeavesDataList {...listProps} />
                            </LeftPanel>
                            <RightPanel>
                                <LeavesForm scopes={scopes} {...formProps} />
                            </RightPanel>
                        </SplitView>
                        <FloatingActionButton
                            data-testid="new-record-button"
                            onClick={actions.resetForm}
                        />
                    </>
                )}
            </CrudProvider>
        </React.Fragment>
    );
};

export default Leaves;
