import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Image, Form,Modal } from 'react-bootstrap';
import {message} from 'antd';
import axios from 'axios';

import "../css/ShoppingCartCard.css";


function beifen() {
    const cartParams = {
        current: 1,
        size: 10
    }
    const [modal, setModal] = useState(false);
    const [total, setTotal] = useState(0);
    const [carts, setCarts] = useState([]);
    const userId = localStorage.getItem('userId');

    const getCartList = async () => {
        // const userId = 99;
        const res = await axios.post('/shoppingCart/getByUserId', {
            userId,
            page: cartParams
        })
        let _arr = res.data.result.records || [];
        let t = 0;
        _arr.map(item=>{
            let _s = item.number * item.unitPrice;
            t += _s;
        })
        setTotal(t);
        setCarts([...carts, ..._arr]);
        console.log(carts)
    }

    useEffect(() => {
        getCartList();
    }, [])


    const numChange = async (e, id) => {
        if(!e.target.value) return;
        let _active = carts.find(item=>item.id === id);
        const res = await axios.post('/shoppingCart/update', {
            userId: userId,
            goodsId: _active.goodsId,
            id,
            number: e.target.value,
            unitPrice: _active.unitPrice,
            picture: _active.picture,
            createTime: _active.createTime,
            commodityName: _active.commodityName
        })
        if(res.status === 200){
            carts.splice(0, carts.length);
            setCarts(carts);
            getCartList();
        }
    }

    const delCart = async (goodsId) => {
        const res = await axios.post('/shoppingCart/deleteOne', {
            goodsId,
            // userId: localStorage.getItem('userId')
        })
        if(res.status === 200){
            carts.splice(0, carts.length);
            setCarts(carts);
            getCartList();
        }
    }

    const checkOut = async () =>{
        const res = await axios.get('/trade/submit');
        if(res.data.res===1){
            carts.splice(0, carts.length);
            setCarts(carts);
            getCartList();
            handleClose();
            return;
        }
        message.warning(res.data.resMsg);
        
    }
    const showModal = () => {
        setModal(true);
    }
    const handleClose = () => {
        setModal(false);
    }
    
    return (<div className="shopping-cart-card" style={{ width: '58rem' }}>
        <Form>
            {carts.map((item, idx) => (<div>
                <Row className='title'>
                    <Col xs={6}>Product</Col>
                    <Col className='inline-center'>Qty</Col>
                    <Col className='inline-center'>Remove</Col>
                </Row>
                <Row className='goods'>

                    {item.picture && (
                    <img className='cart-img'
                      src={`/common/download?name=${item.picture}`}
                      alt=''
                    />
                  )}

                    <Col xs={4}>
                        <div className='inline-center pt-20'>{item.commodityName}</div>
                        <div className='inline-center'>{item.unitPrice}AU</div>
                    </Col>
                    <Col><Form.Control className='count block-center' defaultValue={item.number} onChange={(e)=>numChange(e,item.id)} /></Col>
                    <Col><span className='close block-center' onClick={() => delCart(item.goodsId)}>×</span></Col>
                </Row>
            </div>))}

            <div className='line'></div>
            <Row>
                <Col xs={6}>
                    <Button className='check-out-btn' onClick={showModal}>Check out ➜</Button>
                </Col>
                <Col>
                    <div className='label'>Subtotal:</div>
                    <div className='label'>Taxes:</div>
                    <div className='label last'>shipping:</div>
                    <div className='label total'>TOTAL PRICE:</div>
                </Col>
                <Col>
                    <div className='val'>{total}AU</div>
                    <div className='val'>0.00</div>
                    <div className='val last'>0AU</div>
                    <div className='val total'>{total}AU</div>
                </Col>
            </Row>
        </Form>
        <Modal show={modal} onHide={handleClose}>
            <Modal.Body>Are you sure you want to place an order</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                cancel
            </Button>
            <Button variant="primary" onClick={checkOut}>
                submit
            </Button>
            </Modal.Footer>
        </Modal>    
    </div>)
}

export default ShoppingCartCard;