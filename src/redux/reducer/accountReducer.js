import {
    USER_LOGIN_REQUEST, USER_LOGIN_REQUEST_FAILED, USER_LOGIN_REQUEST_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_REQUEST_FAILED,
    USER_LOGOUT_REQUEST_SUCCESS
} from '../action/accountAction';


const INITIAL_STATE = {

    account: {
        access_token: '',
        refresh_token: '',
        groupWithRoles: {},
        email: '',
        username: ''
    },
    isLoading: false,
    errMess: ''
};

const accountReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_LOGIN_REQUEST:

            return {

                ...state,
                isLoading: true,
                errMess: ''

            };

        case USER_LOGIN_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.error

            };
        case USER_LOGIN_REQUEST_SUCCESS:
            return {
                ...state, account: action.user

            };


        case USER_LOGOUT_REQUEST:

            return {
                ...state,
                isLoading: true,
                errMess: ''
            };

        case USER_LOGOUT_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.error

            };
        case USER_LOGOUT_REQUEST_SUCCESS:
            return {
                ...state, account: {
                    access_token: '',
                    refresh_token: '',
                    groupWithRoles: {},
                    email: '',
                    username: ''
                }
            };

        default: return state;

    }

};

export default accountReducer;