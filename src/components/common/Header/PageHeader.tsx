import React from "react";
import {Typography} from "@mui/material";

const pageLabel: Record<string, string> = {
    '/dashboard': 'Статистика',
    '/dashboard/calendar': 'Статистика',
    '/exceptions': 'Винятки',
}

const PageHeader: React.FC<{ page: string }> = ({page}) => {
    return (
        <Typography textAlign={'center'}>
            {pageLabel[page]}
        </Typography>
    )
}

export default PageHeader;