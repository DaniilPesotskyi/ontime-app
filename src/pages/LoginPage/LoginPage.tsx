import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";

import {useCompany} from "../../hooks/company/useCompany.ts";

import {LOCAL_STORAGE_COMPANY_KEY} from "../../constants.ts";

import {getCompanyByRequest} from "../../api/companies.ts";

import Container from "../../components/ui/Container.tsx";
import CodeInput from "../../components/pages/LoginPage/CodeInput.tsx";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState<string | null>(() => localStorage.getItem(LOCAL_STORAGE_COMPANY_KEY));
    const {data: company, isLoading} = useCompany(companyId || "");

    useEffect(() => {
        if (company) {
            navigate("/");
        }
    }, [company]);

    const onSubmit = async (code: string) => {
        try {
            const company = await getCompanyByRequest(code);
            if (company) {
                localStorage.setItem(LOCAL_STORAGE_COMPANY_KEY, company.id);
                setCompanyId(company.id);
            } else {
                alert("невірний код!");
            }
        } catch (error) {
            alert("Помилка :(");
        }
    };

    return (
        <>
            <Container>
                {!companyId && <CodeInput onSubmit={onSubmit}/>}
            </Container>

            <Backdrop open={isLoading}>
                <CircularProgress size={30}/>
            </Backdrop>
        </>
    );
};

export default LoginPage;
