import React from "react";
import {Avatar, Box, Skeleton} from "@mui/material";

import {useAuth} from "../../../hooks/useAuth.ts";

const UserCard: React.FC = () => {
    const {data, isLoading} = useAuth()

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,

                width: 'fit-content',

                p: 1,
                mx: 'auto',
                mb: 2,
            }}
        >
            {isLoading ? (
                <>
                    <Skeleton variant={'circular'} width={'40px'} height={'40px'} />
                    <Skeleton width={'150px'} height={'56px'} />
                </>
            ) : (
                <>
                    <Avatar/>
                    Вітаємо, {data?.name}
                </>
            )}
        </Box>
    )
}

export default UserCard;