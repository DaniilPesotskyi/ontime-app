import React, {useState} from "react";
import {MenuRounded} from "@mui/icons-material";
import {IconButton} from "@mui/material";

import SideMenu from "../Sidemenu/SideMenu.tsx";

const MenuButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <IconButton onClick={() => setIsOpen(true)}>
                <MenuRounded/>
            </IconButton>

            <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        </>
    )
}

export default MenuButton