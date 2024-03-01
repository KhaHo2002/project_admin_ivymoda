import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { doLogin } from "../../redux/action/accountAction";

const Code = (props) => {
    const [queryParameters] = useSearchParams();
    const firstRun = useRef(false);
    // const [messErr, setMess] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const messErr = useSelector(state => state.accountReducer.errMess);
    const user = useSelector(state => state.accountReducer.account);

    useEffect(() => {
        let ssoToken = queryParameters.get("ssoToken");
        if (ssoToken && firstRun.current === false) {
            firstRun.current = true;
            dispatch(doLogin(ssoToken));
            return;
        }
        if (user.access_token) {
            navigate("/dash_board");
        }

    }, [dispatch, queryParameters, user, navigate]);

    return (
        <>
            <div>
                {messErr} <br></br>
            </div>
        </>
    )
}

export default Code;