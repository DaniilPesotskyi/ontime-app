import React from "react";
import {Box} from "@mui/material";

interface IProps {
    children: React.ReactNode;
}

const Container: React.FC<IProps> = ({children}) => {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            padding: 1
        }}>
            {children}
        </Box>
    )
}

export default Container;