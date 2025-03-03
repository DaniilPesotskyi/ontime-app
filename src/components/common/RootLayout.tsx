import React, {Suspense, useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress, LinearProgress} from "@mui/material";

import {useCompany} from "../../hooks/company/useCompany.ts";
import {useAuth} from "../../hooks/useAuth.ts";

import {IUser} from "../../types/user";

import Header from "./Header/Header.tsx";
import useTelegram from "../../hooks/useTelegram.ts";

const RootLayout: React.FC = () => {
    const {tg, tgUser} = useTelegram()

    const location = useLocation()
    const navigate = useNavigate()

    const {data: company} = useCompany();

    const defaultUser: IUser = {id: tgUser.id, role: 'user', telegramId: tgUser.id, name: tgUser.first_name};

    const {isLoading} = useAuth(company?.id, String(tgUser.id), defaultUser);

    useEffect(() => {
        tg.expand()
        tg.disableVerticalSwipes()
    }, [])

    useEffect(() => {
        if(location.pathname !== '/') {
            tg.BackButton.onClick(() => navigate(-1))
            tg.BackButton.show()
        } else {
            tg.BackButton.hide()
        }
    }, []);


    return (
        <>
            <Header/>
            <Suspense fallback={<LinearProgress/>}>
                <Outlet/>
            </Suspense>
            <Backdrop open={isLoading} sx={{zIndex: 200}}>
                <CircularProgress/>
            </Backdrop>
        </>
    );
};

export default RootLayout;