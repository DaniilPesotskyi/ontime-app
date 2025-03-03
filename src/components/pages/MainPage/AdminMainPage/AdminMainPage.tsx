import React from "react";
import {LinearProgress, Typography} from "@mui/material";

import {useCompany} from "../../../../hooks/company/useCompany.ts";
import {useCompanyUsers} from "../../../../hooks/company/useCompanyUsers.ts";

import UserItem from "./UserItem.tsx";

const AdminMainPage: React.FC = () => {
    const {data: company} = useCompany()

    if (!company) {
        return (
            <Typography textAlign="center" color="error">Не вдалося завантажити компанію :(</Typography>
        );
    }

    const {data: users, isLoading} = useCompanyUsers(company.id)
    const usersMap = users ? users.filter(user => user.role !== 'admin') : []

    return (
        <>
            {usersMap.map((item, index) => (
                <UserItem key={index} user={item}/>
            ))}
            {isLoading && <LinearProgress/>}
        </>
    )
}

export default AdminMainPage;