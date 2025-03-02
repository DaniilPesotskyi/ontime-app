import React from "react";
import {Box} from "@mui/material";

import {useCompanyUsers} from "../../../../hooks/company/useCompanyUsers.ts";
import {useCompany} from "../../../../hooks/company/useCompany.ts";

import UserItem from "./UserItem.tsx";

const UsersList: React.FC = () => {
    const {data: company} = useCompany()

    const {data: users} = useCompanyUsers(company ? company.id : '')

    return (
        <Box>
            {users?.map((item, index) => (
                <UserItem key={index} user={item} />
            ))}
        </Box>
    )
}

export default UsersList