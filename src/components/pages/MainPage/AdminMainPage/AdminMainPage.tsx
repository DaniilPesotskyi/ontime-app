import React from "react";
import {LinearProgress, Typography} from "@mui/material";

import {useCompany} from "../../../../hooks/company/useCompany.ts";
import {useCompanyUsers} from "../../../../hooks/company/useCompanyUsers.ts";

import UserItem from "./UserItem.tsx";
import {IUser} from "../../../../types/user";

const AdminMainPage: React.FC = () => {
    const {data: company} = useCompany()

    if (!company) {
        return (
            <Typography textAlign="center" color="error">Не вдалося завантажити компанію :(</Typography>
        );
    }

    const {data: users, isLoading} = useCompanyUsers(company.id)
    const usersMap = users ? users.filter(user => user.role !== 'admin') : []

    const usersToRender = usersMap
        .sort(({name: nameA}, {name: nameB}) => nameA.toLowerCase().localeCompare(nameB.toLocaleLowerCase()))
        .reduce<Record<string, IUser[]>>((acc, user) => {
            (acc[user.department] ??= []).push(user);
            return acc
        }, {})

    console.log(usersToRender)

    return (
        <>
            {Object.keys(usersToRender).map((department) => (
                <>
                    <Typography variant={'subtitle1'} textAlign={'center'} fontWeight={'bold'} color={'textSecondary'}
                                marginBottom={1}>{department}</Typography>
                    {usersToRender[department].map(user => (
                        <UserItem key={user.id} user={user}/>
                    ))}
                </>
            ))}
            {isLoading && <LinearProgress/>}
        </>
    )
}

export default AdminMainPage;