import React from "react";
import {useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {AnimatePresence, motion, Variants} from "motion/react";

import {TRANSITION_DURATION} from "../../../constants.ts";

import PageHeader from "./PageHeader.tsx";
import DefaultHeader from "./DefaultHeader.tsx";

const animations: Variants = {
    initial: {opacity: 0, y: '100%'},
    animate: {opacity: 1, y: 0, transition: {duration: TRANSITION_DURATION}},
    exit: {opacity: 0, y: '-100%'}
};

const Header: React.FC = () => {
    const {pathname} = useLocation()
    return (
        <Box component="header"
             sx={{
                 position: "sticky",
                 top: 0,
                 left: 0,

                 px: 1,
                 py: 1,

                 backgroundColor: "background.default",

                 overflow: 'hidden',
                 zIndex: 1,
             }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    {...animations}
                >
                    {pathname === "/" ? <DefaultHeader/> : <PageHeader page={pathname}/>}
                </motion.div>
            </AnimatePresence>
        </Box>
    )
}

export default Header;