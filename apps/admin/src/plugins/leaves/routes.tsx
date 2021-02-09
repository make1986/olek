import React, { Suspense, lazy } from "react";
import Helmet from "react-helmet";
import { Route } from "@webiny/react-router";
import { RoutePlugin } from "@webiny/app/types";
import { CircularProgress } from "@webiny/ui/Progress";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";

const Loader = ({ children, ...props }) => (
    <Suspense fallback={<CircularProgress />}>{React.cloneElement(children, props)}</Suspense>
);

const Leaves = lazy(() => import("./views/Leaves"));

const leavesRoute: RoutePlugin = {
    type: "route",
    name: "route-admin-leaves",
    route: (
        <Route
            path={"/leaves"}
            exact
            render={() => (
                <AdminLayout>
                    <Helmet>
                        <title>Leaves</title>
                    </Helmet>
                    <Loader>
                        <Leaves />
                    </Loader>
                </AdminLayout>
            )}
        />
    )
};

const routes: RoutePlugin[] = [leavesRoute];

export default routes;
