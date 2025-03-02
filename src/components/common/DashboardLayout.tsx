import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import {Tab, Tabs} from "@mui/material";

const DashboardLayout: React.FC = () => {
    const {pathname} = useLocation()

    return (
        <>
            <Tabs
                variant="fullWidth"
                value={pathname}
                sx={{
                    mb: 2
                }}
            >
                <Tab component={Link} label="Діаграми" value="/dashboard" to={'/dashboard'} replace={true}/>
                <Tab component={Link} label="Календар" value="/dashboard/calendar" to={'/dashboard/calendar'} replace={true}/>
            </Tabs>
            <Outlet/>
        </>
    )
}

export default DashboardLayout;