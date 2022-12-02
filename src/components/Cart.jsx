import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, getCartThunk } from '../store/slices/cart.slice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    console.log(cart);

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shopping cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cart.map(product => (
                        <div key={product.id} className="product-cart">
                            <div className="product-cart-info">
                                <p className="brand">{product.brand}</p>
                                <p>{product.title}</p>
                                <p className="product-cart-quantity">{product.productsInCart.quantity}</p>
                            </div>
                            <div className="total-product">
                                <p>{product.productsInCart.quantity*product.price}</p>
                            </div>
                        </div>
                    ))}

                </Offcanvas.Body>
                    <Card.Footer>
                        <div className="total">
                            <span>Total: </span>

                        </div>
                        <Button onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
                    </Card.Footer>
            </Offcanvas>
        </div>
    );
};

export default Cart;