import CountUp from 'react-countup';
import React, { useState, useEffect } from 'react';
import axios from '../../customize/customAxios';
import { endPoinProduct } from '../../api_data/endpoint';

import { LineCharts } from '../chart/chart';
import { GeoChart } from '../chart/chart';

import './dashBoard.scss';




const DashBoard = (props) => {
    const [lenghtDataProduct, setLengthDataProduct] = useState([]);
    const [lenghtDataCustomer, setLengthDataCustomert] = useState([]);
    const fetchDataProduct = async () => {
        try {
            let getAllPruduct = await axios.get(`${process.env.REACT_APP_API}/${endPoinProduct.get_all_product}`);
            if (getAllPruduct.errCode == 0) {
                setLengthDataProduct(getAllPruduct.data);
            }
            else {
                console.log(getAllPruduct.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const fetchCountCustomer = async () => {
        try {

            let countCustomer = await axios.get(`${process.env.REACT_APP_API}/${endPoinProduct.count_customer}`);
            if (countCustomer.errCode == 0) {
                setLengthDataCustomert(countCustomer.data);
            }
            else {
                console.log(countCustomer.message);
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchCountCustomer();
        fetchDataProduct();
    }, []);

    return (
        <>
            <div className="dashboard">
                <div className="report row">
                    <div className="col-lg-3">
                        <div className="view_report">
                            <div className="box-top">
                                <div className="box-left">
                                    <div className="title">Số lượng sản phẩm</div>
                                    <div className="sum"><CountUp end={lenghtDataProduct.length} delay={0.1} duration={1} /></div>
                                </div>
                                <div className="box-right">
                                    <i className="fas fa-gift"></i>
                                </div>
                            </div>
                            <div className="box-bottom">
                                <span className="view_detail">View report</span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="view_report">
                            <div className="box-top">
                                <div className="box-left">
                                    <div className="title">Số lượng khách hàng</div>
                                    <div className="sum">$<CountUp end={lenghtDataCustomer} delay={0.1} duration={1} /></div>
                                </div>
                                <div className="box-right">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                            </div>
                            <div className="box-bottom">
                                <span className="view_detail">View report</span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="view_report">
                            <div className="box-top">
                                <div className="box-left">
                                    <div className="title">Số lượng</div>
                                    <div className="sum">$<CountUp end={1500} delay={0.1} duration={1} /></div>
                                </div>
                                <div className="box-right">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                            </div>
                            <div className="box-bottom">
                                <span className="view_detail">View report</span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="view_report">
                            <div className="box-top">
                                <div className="box-left">
                                    <div className="title">Số lượng</div>
                                    <div className="sum">$<CountUp end={100} delay={0.1} duration={1} /></div>
                                </div>
                                <div className="box-right">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                            </div>
                            <div className="box-bottom">
                                <span className="view_detail">View report</span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="charts">
                    <div className='chart_item'>
                        <LineCharts />
                    </div>
                    <div className='chart_item'>
                        <GeoChart />
                    </div>

                </div>
            </div>
        </>
    )
}

export default DashBoard;