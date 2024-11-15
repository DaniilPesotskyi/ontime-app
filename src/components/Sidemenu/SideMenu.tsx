import React from "react";
import {Box, IconButton, SwipeableDrawer, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu: React.FC<IProps> = ({isOpen, onClose}) => {
    return (
        <SwipeableDrawer
            onOpen={() => {
            }}
            onClose={onClose}
            anchor={'left'}
            open={isOpen}
            sx={{
                '& .MuiDrawer-paper': {
                    width: "100%",
                    padding: "20px 10px",
                }
            }}
        >
            <Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    height: "50px",
                }}>
                    <Typography variant={'h5'}>Меню</Typography>
                    <IconButton onClick={onClose}>
                        <Close/>
                    </IconButton>
                </Box>
            </Box>
        </SwipeableDrawer>
    )
}

export default SideMenu