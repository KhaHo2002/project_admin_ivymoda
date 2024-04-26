import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from 'react';
import { endPoinProduct } from '../../api_data/endpoint';
import axios from '../../customize/customAxios';
import './order.scss';

const Order = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchOrderCustomer = async () => {
            try {
                const allOrderCustomer = await axios.get(`${process.env.REACT_APP_API}/${endPoinProduct.get_all_order_customer}`);
                if (allOrderCustomer.errCode === 0) {
                    const convertedData = convertOrder(allOrderCustomer.data);
                    console.log(allOrderCustomer.data);
                    setRows(convertedData);
                } else {
                    console.log(allOrderCustomer.message);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrderCustomer();
    }, []);

    const convertOrder = (orderCustomer) => {
        const convertedRows = orderCustomer.map((element) => createData(
            element.customer,
            element.number_phone,
            element.method_pay,
            element.discountCode,
            element.total_amount,
            element.product,
            element.quantity_pro
        ));
        return convertedRows;
    };

    function createData(customer, number_phone, method_pay, discountCode, total_amount, product, quantity_pro) {
        console.log(discountCode, "??");
        return {
            customer,
            number_phone,
            date: '2020-01-05',
            method_pay,
            discountCode,
            total_amount,
            history: [
                {

                    customerId: 'Anonymous',
                    product: product,
                    total_amount: total_amount,
                    quantity_pro: quantity_pro
                },
            ],
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.customer}
                    </TableCell>
                    <TableCell >{row.number_phone}</TableCell>
                    <TableCell >{row.date}</TableCell>
                    <TableCell >{row.discountCode}</TableCell>
                    <TableCell >{row.method_pay}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Chi tiết hóa đơn
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Các sản phẩm</TableCell>
                                            <TableCell>Tổng các sản phẩm</TableCell>
                                            <TableCell align="right">Tổng giá tiền</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>

                                                <TableCell component="th" scope="row">
                                                    <TableCell align="right">
                                                        {historyRow.product.map((item, index) => (
                                                            <div key={index} className='detail_product-order'>
                                                                <span className='name_product'>{item.name_pro}</span>&ensp;
                                                                <img width={50} height={70} src={item.image_pro} alt={item.name_pro} />
                                                            </div>
                                                        ))}
                                                    </TableCell>

                                                </TableCell>

                                                <TableCell align="right">
                                                    {historyRow.quantity_pro}
                                                </TableCell>

                                                <TableCell align="right">
                                                    {historyRow.total_amount}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.number.isRequired,
            carbs: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    customerId: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
        }).isRequired,
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Tên khách hàng</TableCell>
                        <TableCell >Số điện thoại</TableCell>
                        <TableCell >Ngày thanh toán</TableCell>

                        {/* <TableCell >Fat</TableCell> */}
                        <TableCell >Mã giảm giá</TableCell>
                        <TableCell >Phương thức thanh toán</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Order;
