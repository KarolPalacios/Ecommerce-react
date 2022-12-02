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


    let priceTotal = 0

    if(cart){
        const cb = (acc, cv) => {
            console.log(cv)
            let value1 = Number(cv.price) * cv.productsInCart?.quantity
            let value2 = acc + value1
            return value2
        }

        priceTotal = cart.reduce(cb, 0)
    }



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
                                <Link to={`/product/${product.id}`} style={{textDecoration: "none", color: "black"}}>
                                {product.title}
                                </Link>
                                <div className="product-cart-quantity">{product.productsInCart.quantity}</div>
                            </div>

                            <div className="total-product">
                                <p><b>$ {product.productsInCart.quantity*product.price}</b></p>
                            </div>
                        </div>
                    ))}

                </Offcanvas.Body>
                    <Card.Footer>
                        <div className="total">
                            <span>Total: </span>
                            <b>$ {priceTotal}</b>
                        </div>
                        <Button variant="dark" onClick={() => dispatch(checkoutCartThunk())}>Checkout</Button>
                    </Card.Footer>
            </Offcanvas>
        </div>
    );
};

export default Cart;