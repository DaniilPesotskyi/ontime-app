import React from "react";
import {Link} from "react-router-dom";
import {Box, Button, IconButton} from "@mui/material";
import {EventBusyRounded, SpaceDashboardOutlined} from "@mui/icons-material";

import {useCompany} from "../../../hooks/company/useCompany.ts";

const DefaultHeader: React.FC = () => {
    const {data: company} = useCompany()

    return (
        <>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <IconButton
                    component={Link}
                    to={'/dashboard'}
                >
                    <SpaceDashboardOutlined/>
                </IconButton>
                <Button
                    variant='text'
                    size={'large'}
                    sx={{
                        fontSize: 20,
                    }}
                >
                    {company?.title}
                </Button>
                <IconButton
                    component={Link}
                    to={'/exceptions'}
                >
                    <EventBusyRounded/>
                </IconButton>
            </Box>
        </>
    )
}

export default DefaultHeader;