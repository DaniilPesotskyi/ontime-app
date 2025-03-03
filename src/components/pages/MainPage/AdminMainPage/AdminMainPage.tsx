import React from "react";
import {Box} from "@mui/material";

import {useCompany} from "../../../../hooks/company/useCompany.ts";
import {useCompanyUsers} from "../../../../hooks/company/useCompanyUsers.ts";

import UserItem from "./UserItem.tsx";

const AdminMainPage: React.FC = () => {
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

export default AdminMainPage;