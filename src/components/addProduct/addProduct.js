import React, { useState, useEffect } from 'react';
import axios from '../../customize/customAxios';
import { endPoinProduct } from '../../api_data/endpoint';
import CommonUtils from '../../utils/CommonUtils';
import { useNavigate } from 'react-router-dom';
import './addProduct.scss';

let AddProduct = (props) => {
    let [errors, setErrors] = useState({});
    const [dataSet, setFormData] = useState({
        name_pro: '',
        type_pro_sex: '',
        image_pro: '',
        price: 0,
        sale: 0,
        quantity: 0,
        size: [],
        color: [],
        desprohtml: '',
        statusProduct: ''
    });
    let [dataColor, setDataColor] = useState([]);
    let [dataSize, setDataSize] = useState([]);
    let [arraySize, setArraySize] = useState([]);
    let [arrayColor, setArrayColor] = useState([]);
    let navigate = useNavigate();


    let fetchDataSize = async () => {
        try {
            let getAllSize = await axios.get(`${process.env.REACT_APP_API}/${endPoinProduct.size}`);
            if (getAllSize.errCode == 0) {
                setDataSize(getAllSize.data);
            }
            else {
                console.log(getAllSize.message);
            }
        } catch (error) {
            throw error;
        }
    };

    let fetchDataColor = async () => {
        try {
            let getAllSize = await axios.get(`${process.env.REACT_APP_API}/${endPoinProduct.color}`);
            if (getAllSize.errCode == 0) {
                setDataColor(getAllSize.data);
            }
            else {
                console.log(getAllSize.message);
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchDataColor();
        fetchDataSize();
    }, []);


    let handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    let getColorToConvert = (color) => {
        let newArrayColor = [...arrayColor];
        const index = newArrayColor.findIndex(item => item.idcolor == color.idcolor);
        if (index === -1) {
            color.isChecked = !color.isChecked;
            let convertColor = {
                name_c: color.name_c,
                idcolor: color.idcolor,
                isChecked: false,
                code_color: color.code_color
            }
            newArrayColor.push(convertColor);

        }
        else {
            newArrayColor[index].isChecked = !newArrayColor[index].isChecked;
            if (newArrayColor[index].isChecked) {
                color.isChecked = !color.isChecked;
                newArrayColor.splice(index, 1);
            }
        }
        setArrayColor(newArrayColor);
        setFormData(prevFormData => ({
            ...prevFormData,
            color: newArrayColor
        }));
    };



    let getSizeToConvert = (size) => {
        let newArraySize = [...arraySize];
        let index = newArraySize.findIndex(item => item.idsize === size.idsize);
        if (index === -1) {
            size.isChecked = true;
            newArraySize.push(size);
        } else {
            newArraySize[index].isChecked = !newArraySize[index].isChecked;
            if (!newArraySize[index].isChecked) {
                newArraySize.splice(index, 1);
            }
        }
        setArraySize(newArraySize);
        setFormData(prevFormData => ({
            ...prevFormData,
            size: newArraySize
        }));
    };

    let handleImage = async (event) => {
        let fileImage = event.target.files;
        let file = fileImage[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setFormData((prevFormData) => ({
                ...prevFormData,
                image_pro: base64
            }));
        }
    }


    let validateForm = (dataSet) => {
        let errors = {};
        if (!dataSet.name_pro) {
            errors.name_pro = 'Hãy nhập tên sản phẩm!';
        }
        if (!dataSet.type_pro_sex) {
            errors.type_pro_sex = 'Hãy chọn giới tính cho sản phẩm!';
        }
        if (!dataSet.price) {
            errors.price = 'Hãy nhập giá cho sản phẩm!';
        }
        if (!dataSet.image_pro) {
            errors.image_pro = 'Hãy chọn ảnh cho sản phẩm!';
        }
        if (dataSet.sale<0) {
            errors.sale = 'Hãy nhập sale cho sản phẩm!';
        }
        if (dataSet.quantity<0) {
            errors.quantity = 'Hãy nhập lượng không cho sản phẩm!';
        }
        if (dataSet.size.length == 0) {
            errors.size = 'Hãy chọn size cho sản phẩm!';
        }
        if (dataSet.color.length == 0) {
            errors.color = 'Hãy chọn màu cho sản phẩm!';
        }
        if (!dataSet.desprohtml) {
            errors.desprohtml = 'Hãy nhập thông tin cho sản phẩm!';
        }
        if (!dataSet.statusProduct) {
            errors.status = 'Hãy chọn trạng thái cho sản phẩm!';
        }
        return errors;
    };

    let addProduct = async () => {
        let validationErrors = validateForm(dataSet);
        if (Object.keys(validationErrors).length === 0) {
            try {
                let imageUpClound = await axios.post(`${process.env.REACT_APP_API}/${endPoinProduct.image_clound}`, { data: dataSet.image_pro });
                if (imageUpClound && imageUpClound.errCode === 0) {
                    let data = {
                        name_pro: dataSet.name_pro,
                        type_pro_sex: dataSet.type_pro_sex,
                        image_pro: imageUpClound.data.url,
                        price: dataSet.price,
                        sale: dataSet.sale,
                        quantity: dataSet.quantity,
                        desprohtml: dataSet.desprohtml,
                        status_pro: dataSet.statusProduct,
                        color: JSON.stringify(dataSet.color),
                        size: JSON.stringify(dataSet.size)
                    }
                    let createPro = await axios.post(`${process.env.REACT_APP_API}/${endPoinProduct.create_pro}`, { data });
                    if (createPro.errCode == 0) {
                        navigate('/manage_product');
                    }
                    else {
                        console.log(createPro.message);
                    }
                }
                else {
                    console.log(imageUpClound.message);
                }
            } catch (error) {
                throw error;
            }
        }
        else {
            setErrors(validationErrors);
        }

    }
    return (

        <>

            <div className="input_infor_pro row">
                <p className="title">Thêm mới sản phẩm</p>
                <div className="input_item col-lg-3">

                    <i className="fas fa-signature"></i>&nbsp;<span>Tên sản phẩm :<br /> </span>{errors.name_pro != '' && <span className='error_validate'>{errors.name_pro}</span>}
                    <div className="input_text">
                        <input type="text" className="form-control" name="name_pro" placeholder={dataSet.name_pro} id="name_pro" onChange={handleChange} />
                    </div>
                </div>
                <div className="input_item_checkbox col-lg-3">
                    {errors.type_pro_sex && <span className='error_validate'>{errors.type_pro_sex}</span>}
                    <div className="list_input-check">
                        <span>Loại sản phẩm :</span>&nbsp;
                        <div className="item">
                            <input type="radio" id="" name="type_pro_sex" value="men" onChange={handleChange} />
                            <label>Nam</label>
                        </div>
                        <div className="item">
                            <input type="radio" id="" name="type_pro_sex" value="women" onChange={handleChange} />
                            <label>Nữ</label>
                        </div>
                        <div className="item">
                            <input type="radio" id="" name="type_pro_sex" value="kid" onChange={handleChange} />
                            <label>Trẻ em</label>
                        </div>
                    </div>

                </div >
                <div className="input_item col-lg-3">
                    {errors.image_pro && <span className='error_validate'>{errors.image_pro}</span>}<br />
                    <i className="far fa-images"></i>&nbsp;<span>Hình ảnh :</span> {dataSet.image_pro == '' ? '' : <img src={dataSet.image_pro} />} <br />
                    <div className="input_text">
                        <input type="file" className="form-control" name="image_pro" onChange={handleImage} />
                    </div>

                </div >
                <div className="input_item col-lg-3">
                    <i className="fas fa-dollar-sign"></i>&nbsp;<span>Giá :</span><br />
                    {errors.price && <span className='error_validate'>{errors.price}</span>}
                    <div className="input_text">

                        <input type="number" className="form-control" name="price" id="price" placeholder={dataSet.price} value={dataSet.price} onChange={handleChange} />

                    </div>

                </div >
                <div className="input_item col-lg-3">
                    <i className="fas fa-percent"></i>&nbsp;<span>Sale :</span><br />
                    {errors.sale && <span className='error_validate'>{errors.sale}</span>}
                    <div className="input_text">
                        <input type="number" className="form-control" name="sale" placeholder={dataSet.sale} value={dataSet.sale} onChange={handleChange} />
                    </div>
                </div >

                <div className="input_item col-lg-3">
                    <i className="fas fa-sort-numeric-up-alt"></i>&nbsp;&nbsp;<span>Số lượng :</span><br />
                    {errors.quantity && <span className='error_validate'>{errors.quantity}</span>}
                    <div className="input_text">
                        <input type="number" className="form-control" name="quantity" id="quantity" placeholder={dataSet.quantity} value={dataSet.quantity} onChange={handleChange} />
                    </div>

                </div >
                <div className="input_item col-lg-3">
                    <span>Size :</span><br />
                    {errors.size && <span className='error_validate'>{errors.size}</span>}
                    <div className="list_size_pro">
                        {dataSize.map((item, index) => (
                            <div key={index}>
                                <button type="button"
                                    className={`size_but ${item.isChecked ? 'checked' : ''}`} name="size" value={dataSet.size} onClick={() => getSizeToConvert(item)}>{item.name_s}</button>
                            </div>
                        ))}
                    </div >
                </div >

                <div className="input_item col-lg-3">
                    <span>Màu sắc :</span><br />
                    {errors.color && <span className='error_validate'>{errors.color}</span>}
                    <div className="list_color">
                        {dataColor.map((item, index) => (
                            <span key={index} className={`color_but ${item.isChecked ? 'checked' : ''}`} style={{ backgroundColor: item.code_color }} name="color" value={dataSet.color} onClick={() => getColorToConvert(item)}></span>
                        ))}
                    </div >
                </div >

                <div className="input_item col-lg-6">
                    <i className="fas fa-info"></i>&nbsp;<label htmlFor="description" className="form-label">Giới thiệu :</label><br />
                    {errors.desprohtml && <span className='error_validate'>{errors.desprohtml}</span>}
                    <textarea className="form-control" placeholder={dataSet.desprohtml} name="desprohtml" id="exampleFormControlTextarea1" rows="5" value={dataSet.desprohtml} onChange={handleChange}></textarea>
                </div >
                <div className="input_item_checkbox col-lg-6">
                    {errors.status && <span className='error_validate'>{errors.status}</span>}<br />
                    <div className="list_input-check">
                        <span>Trạng thái sản phẩm :</span>
                        <div className="item">
                            <input type="radio" id="" name="statusProduct" value="business" onChange={handleChange} />
                            <label>Kinh doanh</label>
                        </div>
                        <div className="item">
                            <input type="radio" id="" name="statusProduct" value="inventory" onChange={handleChange} />
                            <label>Tồn kho</label>
                        </div>
                    </div>
                </div>
            </div >
            <div className="button_submit">
                <button type="button" className="button_add_pro" onClick={() => addProduct()}>Add</button>
            </div>
        </>
    )
}

export default AddProduct;