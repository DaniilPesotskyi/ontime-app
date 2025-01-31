import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Box} from "@mui/material";

import {getAllUsersInCompany} from "../../services/usersServices.ts";
import {selectCompany} from "../../store/company/selectors.ts";
import {IUser} from "../../types/userTypes.ts";
import UserItem from "./UserItem.tsx";

const UsersStats: React.FC = () => {
    const company = useSelector(selectCompany)

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const getAllUsers = async () => {
            if (!company) {
                return
            }
            const users = await getAllUsersInCompany(company?.id);
            setUsers(users)
        }

        getAllUsers()
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            {users.length > 0 && users.map((user) => (
                <UserItem key={user.id} user={user}/>
            ))}
        </Box>
    )
}

export default UsersStats;