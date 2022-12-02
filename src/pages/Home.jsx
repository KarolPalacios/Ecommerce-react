import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { filterProductsThunk, filterTitleThunk, getProductsThunk } from '../store/slices/products.slice'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { createPurchaseThunk } from '../store/slices/purchases.slice';

const Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    const [categoriesList, setCategoriesList] = useState([])
    const [inputSearch, setInputSearch] = useState("")

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategoriesList(res.data.data.categories))
    }, [])

    return (
        <div>
            <Row>
                {/* CATEGORIAS */}
                <Col lg={3}>
                    <ListGroup>
                        {categoriesList.map(category => (
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => dispatch(filterProductsThunk(category.id))}
                                style={{ cursor: "pointer" }}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col lg={9}>
                    {/* COLUMNAS */}
                    <InputGroup className="mb-3">
                        <Form.Control
                            className="search-input"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={() => dispatch(filterTitleThunk(inputSearch))}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={3} className="g-4">
                        {products.map(product => (
                            <Col key={product.id}>
                                <Card style={{height: 330}}>
                                    <Link to={`/product/${product.id}`} style={{textDecoration: "none", color: "black"}}>
                                        <Card.Img 
                                            className="card-img"
                                            variant="top"
                                            src={product.productImgs[0]}
                                        />
                                        <Card.Body>
                                            <Card.Title style={{fontSize: 17}}>
                                                {product.title}
                                            </Card.Title>
                                            <Card.Text>
                                                $ {product.price}
                                                <button variant="secondary" className="add-btn">
                                                    <i className="fa-solid fa-cart-plus"></i>
                                                </button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </Col>
            </Row>
        </div>
    );
};

export default Home;