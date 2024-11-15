import React from "react";
import {Drawer, Backdrop, CircularProgress, Collapse, Box} from "@mui/material";
import {useSelector} from "react-redux";

import {selectCompanyInLoad} from "../../store/company/selectors.ts";

import CompanyCode from "./CompanyCode.tsx";
import UsersCompanies from "./UsersCompanies.tsx";

interface IProps {
    isOpen: boolean;
}

const CompaniesDrawer: React.FC<IProps> = ({isOpen}) => {
    const inLoad = useSelector(selectCompanyInLoad);

    return (
        <Drawer
            onClose={() => {
            }}
            anchor={"bottom"}
            open={isOpen}
            sx={{
                "& .MuiDrawer-paper": {
                    height: "100%",
                    padding: "20px 10px",
                },
            }}
        >
            <Collapse in={!inLoad}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '20px',
                }}>
                    <CompanyCode />
                    <UsersCompanies />
                </Box>
            </Collapse>
            <Backdrop open={inLoad}>
                <CircularProgress size={60}/>
            </Backdrop>
        </Drawer>
    );
};

export default CompaniesDrawer;
