import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import App from './App';
import Code from './components/code/code';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import '@fortawesome/fontawesome-free/css/all.css';
import DashBoard from './components/dashBoard/dashBoard';
import AddProduct from './components/addProduct/addProduct';
import ProtectedRoutes from './routes/protectedRoutes';
import { useSelector } from "react-redux";
import ManagerProduct from './components/manageProduct/manageProduct';
import { ChartAdmin } from './components/chart/chart';
import Order from './components/order/order';
import UpdateProduct from './components/updatePro/updatepro';

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));


const VeryfiRoutes = () => {
  const user = useSelector(state => state.accountReducer.account);


  return (

    <React.Fragment>
      <Routes>
        <Route path="code" element={<Code />} />
        <Route path='/' element={<App />} >
          <Route index path='/' element={<DashBoard />} />
          <Route path="dash_board" element={
            <ProtectedRoutes user={user?.access_token}>
              <DashBoard />
            </ProtectedRoutes>
          } ></Route>
          <Route path="manage_product" element={
            <ProtectedRoutes user={user?.access_token}>
              <ManagerProduct />
            </ProtectedRoutes>
          } ></Route>
          <Route path="add_product" element={
            <ProtectedRoutes user={user?.access_token}>
              <AddProduct />
            </ProtectedRoutes>
          } ></Route>

          <Route path="charts_admin" element={
            <ProtectedRoutes user={user?.access_token}>
              <ChartAdmin />
            </ProtectedRoutes>
          } ></Route>
          <Route path="order_cutomer" element={
            <ProtectedRoutes user={user?.access_token}>
              <Order />
            </ProtectedRoutes>
          } ></Route>
          <Route path="update_product" element={
            <ProtectedRoutes user={user?.access_token}>
              <UpdateProduct />
            </ProtectedRoutes>
          } ></Route>
        </Route>
      </Routes>
    </React.Fragment>
  )
}

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <VeryfiRoutes />

    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endPoinProduct. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
