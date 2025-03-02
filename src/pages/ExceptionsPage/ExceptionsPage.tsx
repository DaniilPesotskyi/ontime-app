import React from "react";
import {Container, Typography} from "@mui/material";

import PageDescription from "../../components/ui/PageDescription.tsx";

const ExceptionsPage: React.FC = () => {
    return (
        <Container>
            <PageDescription>Ваші відпустки та лікарняні</PageDescription>
            <Typography variant={'h5'} textAlign={'center'}>Можливість додавання відпусток та лікарняних в розробці</Typography>
        </Container>
    )
}

export default ExceptionsPage;