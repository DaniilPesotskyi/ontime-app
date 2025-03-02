import React from "react";

import {IUser} from "../../../../types/user";
import {useRecordsByPeriod} from "../../../../hooks/records/useRecordsByPeriod.ts";
import {useCompany} from "../../../../hooks/company/useCompany.ts";
import {Box, Divider, Typography} from "@mui/material";
import {calculateDelay} from "../../../../utils/calculateDelay.ts";

interface IProps {
    user: IUser
}

const UserItem: React.FC<IProps> = ({user}) => {
    const {data: company} = useCompany();

    const currentDay = new Date().toLocaleDateString("en-US")

    const {data: records} = useRecordsByPeriod(company ? company.id : '', user.id, currentDay, currentDay)

    const record = records?.[0];

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography>{user.name}</Typography>
                {record ? (
                    <Typography>{calculateDelay(record.time, company ? company.startWorkHour : 9)} / {record.type}</Typography>
                ) : (
                    <Typography>
                        Відсутній
                    </Typography>
                )}
            </Box>
            <Divider sx={{my: 1}}/>
        </>
    )
}

export default UserItem