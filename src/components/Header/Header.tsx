import React from "react";
import {Box} from "@mui/material";

import CompanyChanger from "./CompanyChanger.tsx";
import AccessChecker from "./AccessChecker.tsx";
import MenuButton from "./MenuButton.tsx";

const Header: React.FC = () => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: "100%",
        }}>
            <MenuButton/>
            <CompanyChanger/>
            <AccessChecker/>
        </Box>
    )
}

export default Header;