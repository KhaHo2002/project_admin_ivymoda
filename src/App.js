import { useEffect, useState, useRef } from 'react';
import { Route, Routes, Navigate, Outlet, useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Header from './components/header/header';
import { doGetAccount } from "./redux/action/accountAction";
import { logoutSSO } from './redux/action/accountAction';
import './App.scss';
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.accountReducer.account);

  useEffect(() => {
    if (user && !user.access_token) {
      dispatch(doGetAccount());
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logoutSSO());
  }

  return (
    <>
      <section className="body_admin">
        <Header />

        <div className=" activity">
          <div className="header_admin">
            <div className="item">
              <div className="search_icon">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" className="search_Admin" placeholder="Search here" />
              </div>
              <div className="item_icon">
                <div className="notifi">
                  <i className="fa-regular fa-bell"></i>
                </div>
                <div className="massage">
                  <i className="fa-regular fa-comment" ></i>
                </div>
                {
                  user && user.access_token != '' ?

                    <div className="login_admin" onClick={() => handleLogout()}>
                      <i className="fa-solid fa-arrow-right" ></i>
                    </div>
                    :
                    <div className="login_admin" >
                      <i className="fa-solid fa-arrow-left" onClick={() => handleLogout()}></i>
                    </div>
                  // ''
                }

              </div >
            </div >
          </div >
          <div className="page-item">


            <Outlet />
          </div>
        </div >
      </section >

    </>
  );
}

export default App;
