import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import Product from '../components/Product';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector(
    (state) => state.productTopRated,
  );
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  // SAMPLE STATE FOR ARRAY OF PRODUCTS
  const sample = [
    {
      sampletitle: 'New Chair 1',
      sampleprice: 1299,
      sampleid: 1,
    },
    {
      sampletitle: 'New Chair 2',
      sampleprice: 1299,
      sampleid: 2,
    },
    {
      sampletitle: 'New Chair 3',
      sampleprice: 1299,
      sampleid: 3,
    },
    {
      sampletitle: 'New Chair 4',
      sampleprice: 1299,
      sampleid: 4,
    },
    {
      sampletitle: 'New Chair 5',
      sampleprice: 1299,
      sampleid: 5,
    },
    {
      sampletitle: 'New Chair 6',
      sampleprice: 1299,
      sampleid: 6,
    },
    {
      sampletitle: 'New Chair 7',
      sampleprice: 1299,
      sampleid: 7,
    },
    {
      sampletitle: 'New Chair 8',
      sampleprice: 1299,
      sampleid: 8,
    },
    {
      sampletitle: 'New Chair 9',
      sampleprice: 1299,
      sampleid: 9,
    },
    {
      sampletitle: 'New Chair 10',
      sampleprice: 1299,
      sampleid: 10,
    }
  ]

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover">


      {/* {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))} */}


        {/* <Carousel.Item>
          <Row>
            {products.slice(0,3).map((product) => (
              <Col key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row>
            {products.slice(3,6).map((product) => (
              <Col key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Carousel.Item> */}

        <Carousel.Item>
          <Row>
              {sample.slice(0,5).map((sample) => (
                <Col key={sample.sampleid}>
                  <Card className="my-3 p-2">
                    <Card.Img src='../uploads/FURNITURE HOUSEHOLD.jpg' variant="top" className="my-0" style={{width:'100%', height:'auto'}}/>
                    <Card.Body>
                        <Card.Title as="h3">{sample.sampletitle}</Card.Title>
                        <Card.Text as="h3">Rs. {sample.sampleprice}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row>
              {sample.slice(5,10).map((sample) => (
                <Col key={sample.sampleid}>
                  <Card className="my-3 p-2">
                    <Card.Img src='../uploads/FURNITURE HOUSEHOLD.jpg' variant="top" className="my-0" style={{width:'100%', height:'auto'}}/>
                    <Card.Body>
                        <Card.Title as="h3">{sample.sampletitle}</Card.Title>
                        <Card.Text as="h3">Rs. {sample.sampleprice}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Carousel.Item>
    
    </Carousel>
  );
};

export default ProductCarousel;
