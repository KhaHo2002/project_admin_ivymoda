
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import axios from '../../customize/customAxios';

import { endPoinProduct } from '../../api_data/endpoint';

import './manageProduct.scss';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    imageCell: {
        width: 30, // Adjust image width as needed
    },
    image: {
        width: '70%',
        height: 'auto',
    },
});



const ManagerProduct = (props) => {

    const [dataProduct, setDataProduct] = useState([]);

    const { classes } = props;

    const fetchDataProduct = async () => {
        try {
            let getAllPruduct = await axios.get(`${process.env.REACT_APP_API}/${endPoinProduct.get_all_product}`);
            if (getAllPruduct.errCode == 0) {
                setDataProduct(getAllPruduct.data);
            }
            else {
                console.log(getAllPruduct.message);
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        fetchDataProduct();
    }, []);
    
    let id = 0;
    function createData(Name, Price, Status, Image, idPro, action) {
        id += 1;
        return { id, Name, Price, Status, Image, idPro, action };
    }
    const rows = [];
    dataProduct.forEach((data) => {
        rows.push(createData(data.name_pro, data.price, data.status_pro, data.image_pro, data.idpro));
    });

    let handleDelatePro = async (id) => {
        try {

            let respose = await axios.delete(`${process.env.REACT_APP_API}${endPoinProduct.delete_product}?id=${id}`);
            if (respose && respose.errCode === 0) {
                fetchDataProduct();
            }
            else {
                console.log(respose.mesage);
            }
        } catch (error) {
            throw error;
        }
    }
    return (
        <div className='table_pro'>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Image</TableCell> {/* New TableCell for image */}
                            <TableCell>Action</TableCell> {/* New TableCell for image */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>

                                <TableCell numeric>{row.Name}</TableCell>
                                <TableCell numeric>{row.Price}</TableCell>
                                <TableCell numeric>{row.Status}</TableCell>
                                <TableCell className={classes.imageCell}>
                                    <img src={row.Image} alt={row.Image} className={classes.image} />
                                </TableCell>
                                <TableCell >
                                    <NavLink
                                        to="/update_product"
                                        state={{ sendIdProduct: row.idPro }}
                                    >
                                        <button type="button" className='edit'><i className="fa-solid fa-edit" ></i></button>
                                    </NavLink>
                                    <button type="button" className='delete'><i className="fa-solid fa-times" onClick={() => handleDelatePro(row.idPro)}></i></button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

ManagerProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManagerProduct);
