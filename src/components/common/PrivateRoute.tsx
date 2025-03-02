import React from "react";
import {Navigate} from "react-router-dom";
import {useCompany} from "../../hooks/company/useCompany.ts";

interface IProps {
    children: React.ReactNode
    redirectTo?: string
}

const PrivateRoute: React.FC<IProps> = ({children, redirectTo = '/login'}) => {
    const {data} = useCompany()

    return !data ? <Navigate to={redirectTo}/> : children
}

export default PrivateRoute;