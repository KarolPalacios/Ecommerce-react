import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Dicember"
]

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    console.log(purchases)

    return (
        <div>
            <h1>Purchases</h1>
            <div className="purchase-container">
                <ul className="purchase-list">
                    {
                        purchases.map(purchase => (
                            <li key={purchase.id}>
                                {purchase.cart.products.map(product => (
                                    <li key={product.cartId} className="product-item">
                                        <div className="info">
                                            <h5>{product.title}</h5>
                                            <p className="product-quantity">
                                                <span><b>{product.productsInCart.quantity}</b></span>
                                            </p>
                                            <p><b>$ {product.price}</b></p>
                                        </div>
                                    </li>
                                ))}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Purchases;