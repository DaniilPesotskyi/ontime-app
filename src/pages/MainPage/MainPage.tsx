import React from "react";
import {Typography} from "@mui/material";

import {useAuth} from "../../hooks/useAuth.ts";

import Container from "../../components/ui/Container.tsx";
import UserCard from "../../components/pages/MainPage/UserCard.tsx";
import UsersList from "../../components/pages/MainPage/AdminMainPage/UsersList.tsx";
import UserMainPage from "../../components/pages/MainPage/UserMainPage/UserMainPage.tsx";

const MainPage: React.FC = () => {
    const {data, isLoading} = useAuth();

    if (!data && !isLoading) {
        return (
            <Typography color={'error'} textAlign={'center'}>
                Помилка отримання користувача
            </Typography>
        )
    }

    return (
        <Container>
            <UserCard/>
            {data?.role === 'user' && (
                <UserMainPage/>
            )}
            {data?.role === 'admin' && (
                <UsersList/>
            )}
        </Container>
    );
};

export default MainPage;