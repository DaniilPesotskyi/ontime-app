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

    if (!company || !user) {
        return (
            <Typography textAlign="center" color="error">Не вдалося завантажити компанію або користувача :(</Typography>
        );
    }

    const currentDay = new Date().toLocaleDateString("en-US");

    const {data: records, isLoading: recordsLoading} = useRecordsByPeriod(company.id, user.id, currentDay, currentDay);
    const {mutate, isPending} = useAddRecords(company.id, user.id);

    const record = records?.[0];
    const isLoading = userLoading || recordsLoading || isPending;

    const handleCheck = (newRecord: IRecord) => {
        mutate([newRecord]);
    };

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
};

export default UserMainPage;
