import React, {lazy} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {Box} from "@mui/material";
import {AnimatePresence, motion} from 'motion/react'

import { TRANSITION_DURATION} from "./constants.ts";

import RootLayout from "./components/common/RootLayout.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
const ExceptionsPage = lazy(() => import("./pages/ExceptionsPage/ExceptionsPage.tsx"));
const DashboardChartsPage = lazy(() => import("./pages/DashboardChartsPage/DashboardChartsPage.tsx"));
const DashboardLayout = lazy(() => import("./components/common/DashboardLayout.tsx"));
const DashboardCalendarPage = lazy(() => import("./pages/DashboardCalendarPage/DashboardCalendarPage.tsx"));
const PrivateRoute = lazy(() => import("./components/common/PrivateRoute.tsx"));

const AnimatedRoute: React.FC<{ children: React.ReactNode, direction: 'left' | 'right' | 'up' | 'down' }> = (
    {
        children,
        direction
    }) => {
    const routeVariants = {
        initial: {
            x: direction === "right" ? "100%" : direction === "left" ? "-100%" : "0",
            y: direction === "down" ? "100%" : direction === "up" ? "-100%" : "0",
        },
        final: {
            x: "0",
            y: "0",
            transition: {duration: TRANSITION_DURATION},
        },
        exit: {
            x: direction === "left" ? "-100%" : direction === "right" ? "100%" : "0",
            y: direction === "down" ? "100%" : direction === "up" ? "-100%" : "0",
            transition: {duration: 0.2}
        }
    };

    return (
        <Box
            component={motion.div}
            variants={routeVariants}
            initial="initial"
            animate="final"
            exit="exit"
        >
            {children}
        </Box>
    );
};


function App() {
    const location = useLocation();

    return (
        <AnimatePresence mode={'wait'}>
            <Routes location={location}
                    key={location.pathname.startsWith('/dashboard') ? "/dashboard" : location.pathname}>
                <Route path={'/login'} element={<LoginPage/>}/>

                <Route path={'/'} element={<PrivateRoute><RootLayout/></PrivateRoute>}>
                    <Route index element={<AnimatedRoute direction={'up'}><MainPage/></AnimatedRoute>}/>
                    <Route path={'/dashboard'}
                           element={<AnimatedRoute direction={'left'}><DashboardLayout/></AnimatedRoute>}>
                        <Route index element={<DashboardChartsPage/>}/>
                        <Route path={'/dashboard/calendar'} element={<DashboardCalendarPage/>}/>
                    </Route>
                    <Route path={'/exceptions'} index
                           element={<AnimatedRoute direction={'right'}><ExceptionsPage/></AnimatedRoute>}/>
                </Route>
            </Routes>
        </AnimatePresence>

    )
}

export default App
