import React from "react";
import {Typography} from "@mui/material";

import {useAuth} from "../../hooks/useAuth.ts";

import Container from "../../components/ui/Container.tsx";
import UserCard from "../../components/pages/MainPage/UserCard.tsx";

import UserMainPage from "../../components/pages/MainPage/UserMainPage/UserMainPage.tsx";
import AdminMainPage from "../../components/pages/MainPage/AdminMainPage/AdminMainPage.tsx";

const MainPage: React.FC = () => {
    const {data} = useAuth();

    if (!data) {
        return (
            <Typography color={'error'} textAlign={'center'}>
                Помилка отримання/створення користувача :(
            </Typography>
        )
    }

    return (
        <Container>
            <UserCard/>
            {data.role === 'user' && (
                <UserMainPage/>
            )}
            {data.role === 'admin' && (
                <AdminMainPage/>
            )}
        </Container>
    );
};

export default MainPage;