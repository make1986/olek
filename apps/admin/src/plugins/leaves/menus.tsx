import React from "react";
import { AdminMenuPlugin } from "@webiny/app-admin/types";
import { ReactComponent as Icon } from "@webiny/app-page-builder/admin/assets/round-ballot-24px.svg";

const plugin: AdminMenuPlugin = {
    type: "admin-menu",
    name: "admin-menu-leaves",
    render({ Menu, Item }) {
        return (
            <Menu name="menu-leaves" label={"Leaves"} icon={<Icon />}>
                <Item label={"Leaves"} path={"/leaves/"} />
            </Menu>
        );
    }
};

export default plugin;
