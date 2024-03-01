

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const parseJwt = (token) => {
    try {
        let parseJWT = JSON.parse(atob(token.split('.')[1]))
        if (parseJWT.exp * 1000 > Date.now()) {
            return parseJWT.exp;
        }
        else {
            return null
        }
    } catch (e) {
        return null;
    }
};

const ProtectedRoutes = ({ user, children }) => {
    if (user) {
        const decodedJwt = parseJwt(user);
        if (decodedJwt !== null) {

            return children
        }
        else {
            window.location.href = `${process.env.REACT_APP_BACKEND_SSO}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`;
        }

    }

}

export default ProtectedRoutes;