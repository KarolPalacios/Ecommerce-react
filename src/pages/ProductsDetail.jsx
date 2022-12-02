import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { createPurchaseThunk } from '../store/slices/purchases.slice';

const ProductsDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const productsList = useSelector(state => state.products)

    const productsFound = productsList.find(productsItem => productsItem.id === Number(id))
    const relatedProducts = productsList.filter(productsItem => productsItem.category.id === productsFound.category.id)

    // console.log(relatedProducts);
    //console.log(productsFound);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [counter, setCounter] = useState(1)
    // const [quantity, setQuantity] = useState("")
    
    const addToCart = (e) => {
        e.preventDefault()
        const productToCart = {
            id: productsFound.id,
            quantity: counter
        }
        console.log(productToCart);
        dispatch(createPurchaseThunk(productToCart))
    }


    const minusOne = () => {
        const minus = counter - 1
        if(minus >= 1){
            setCounter(minus)
        }
    }

    const plusOne = () => setCounter(counter + 1)



    return (
        <div>

            {/* <input 
                type="text"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
            />

            <Button onClick={addToCart} >Add to Cart</Button> */}

            <Row>
                {/* IMAGENES */}
                <Col lg={5}>
                    <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 card-img"
                                src={productsFound?.productImgs[0]}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 card-img"
                                src={productsFound?.productImgs[1]}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 card-img"
                                src={productsFound?.productImgs[2]}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>

                {/* DESCRIPCIÓN */}
                <Col lg={7}>
                    <h1 className='detail-title'>{productsFound?.title}</h1>
                    <p>{productsFound?.description}</p>
                    <div className="price">
                        <p><b>$ {productsFound?.price}</b></p>

                        <div className="shop-counter">
                            <button 
                                className="border"
                                onClick={minusOne}
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>

                            <span>{counter}</span>

                            <button 
                                className="border"
                                onClick={plusOne}
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <Button 
                            className="cart-button" 
                            variant="dark"
                            onClick={addToCart}
                        >
                            Add to cart <i className="fa-solid fa-cart-plus"></i>
                        </Button>
                    </div>
                </Col>
            </Row>

            <div className="recommended">
                <h2>Discover similar items</h2>
                <Row xs={1} md={4} className="g-4">
                    {relatedProducts.map(productsItem => (
                        <Col key={productsItem.id}>
                            <Card style={{ height: 320 }}>
                                <Link 
                                    to={`/product/${productsItem.id}`} 
                                    style={{ textDecoration: "none", color: "black" }}
                                >
                                    <Card.Img
                                        className="card-img"
                                        variant="top"
                                        src={productsItem.productImgs[0]}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: 17 }}>
                                            {productsItem.title}
                                        </Card.Title>
                                        <Card.Text>
                                            $ {productsItem.price}
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProductsDetail;