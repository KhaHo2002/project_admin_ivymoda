import axios from '../../customize/customAxios';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_REQUEST_FAILED = 'USER_LOGIN_REQUEST_FAILED';
export const USER_LOGIN_REQUEST_SUCCESS = 'USER_LOGIN_REQUEST_SUCCESS';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_REQUEST_FAILED = 'USER_LOGOUT_REQUEST_FAILED';
export const USER_LOGOUT_REQUEST_SUCCESS = 'USER_LOGOUT_REQUEST_SUCCESS';

export const DECREMENT = 'DECREMENT';

export const doLogin = (ssoToken) => {

    return async (dispatch) => {
        dispatch({ type: USER_LOGIN_REQUEST })
        axios.post(process.env.REACT_APP_VERIFY_TOKEN, { ssoToken }).then(res => {
            if (res && res.EC === 0) {
                dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, user: res.DT });
            }
            else {
                dispatch({ type: USER_LOGIN_REQUEST_FAILED, error: res.EM });
            }
        }).catch(err => {
            throw err;
        })


    }

};

export const doGetAccount = () => {

    return async (dispatch) => {
        dispatch({ type: USER_LOGIN_REQUEST })
        axios.get(process.env.REACT_APP_GET_ACCOUNT, {}).then(res => {
            if (res && res.EC === 0) {
                dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, user: res.DT });
            }
            else {
                dispatch({ type: USER_LOGIN_REQUEST_FAILED, error: res.EM });
                window.location.href = `${process.env.REACT_APP_BACKEND_SSO}?serviceURL=${process.env.REACT_APP_SERVICE_URL}`
            }
        }).catch(err => {
            throw err;
        })
    }

};

export const logoutSSO = () => {
    return async (dispatch, getState) => {
        dispatch({ type: USER_LOGOUT_REQUEST })
        axios.post(process.env.REACT_APP_LOGOUT_SSO, {}).then(res => {
            if (res && res.EC === 0) {
                dispatch({ type: USER_LOGOUT_REQUEST_SUCCESS, user: res.DT });
                window.location.href = "/";
            }
            else {
                dispatch({ type: USER_LOGOUT_REQUEST_FAILED, error: res.EM });
            }
        }).catch(err => {
            throw err;
        })
    }
}