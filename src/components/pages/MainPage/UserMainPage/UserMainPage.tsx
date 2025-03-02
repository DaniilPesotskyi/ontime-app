import React from "react";
import {Collapse, Typography} from "@mui/material";

import {useCompany} from "../../../../hooks/company/useCompany.ts";
import {useAuth} from "../../../../hooks/useAuth.ts";
import {useRecordsByPeriod} from "../../../../hooks/records/useRecordsByPeriod.ts";
import {useAddRecords} from "../../../../hooks/records/useAddRecords.ts";

import {IRecord} from "../../../../types/record";

import CheckinButton from "./CheckinButton.tsx";
import WishBlock from "./WishBlock.tsx";

const UserMainPage: React.FC = () => {
    const {data: company} = useCompany();
    const {data: user, isLoading: userLoading} = useAuth();

    const currentDay = new Date().toLocaleDateString("en-US")

    const companyId = company?.id || '';
    const userId = user?.id || 0;

    const {data: records, isLoading: recordsLoading} = useRecordsByPeriod(companyId, userId, currentDay, currentDay);
    const {mutate, isPending} = useAddRecords(companyId, userId);

    const record = records?.[0];
    const isLoading = userLoading || recordsLoading || isPending;

    const handleCheck = (newRecord: IRecord) => {
        mutate([newRecord]);
    };

    console.log("RECORDS:", records);
    console.log("CURRENT RECORD:", record);

    if (!user && !isLoading) {
        return <Typography textAlign={'center'} color={'error'}>Щось пішло не так з отриманням користувача</Typography>
    }

    return (
        <>
            <Collapse in={!record}>
                <CheckinButton onCheck={handleCheck} isLoading={isLoading} disabled={!!record}/>
            </Collapse>
            <Collapse in={!!record}>
                <WishBlock/>
            </Collapse>
        </>
    );
}

export default UserMainPage;