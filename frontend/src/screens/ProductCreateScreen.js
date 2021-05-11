import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateProduct } from '../actions/productActions';
import { createProduct } from '../actions/productActions';
import { listCategories, listSubCategories } from '../actions/categoryActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { printSchema } from 'graphql';
// import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { BrandDropdown, CatDropdown, SubCatDropdown } from '../components/Dropdowns';
import NewOptions from '../components/NewOptions';
import { set } from 'mongoose';

const ProductCreateScreen = ({ match, history }) => {
//   const productId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('one');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [categ, setCateg] = useState('6033f160eb01e64a1ccf7046');
  const [subCateg, setSubCateg] = useState('6033f161eb01e64a1ccf7055');
  const [countInStock, setCountInStock] = useState(0);
  const [size, setSize] = useState(0);
  const [description, setDescription] = useState('');
  // const [uploading, setUploading] = useState(false);
  const [newArrival, setNewArrival] = useState(false);
  const [optionsInput, setOptionsInput] = useState([]);

  // const initialValues = {
  //   optName: '',
  //   optPrice: 0,
  //   optDiscount: 0,
  //   optQty: 0
  // };

  // const [sample, setSample] = useState(initialValues);

  const [optName, setOptName] = useState('');
  const [optPrice, setOptPrice] = useState(0);
  const [optDiscount, setOptDiscount] = useState(0);
  const [optQty, setOptQty] = useState(0);


  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  useEffect(() => {
      if (successCreate) {
        history.push('/admin/productlist');
        } 
  }, [successCreate, createdProduct]);

  function handleSubmit(e) {
    let temp = {name: optName, discount: optDiscount, price: optPrice, countInStock: optQty}
    setOptionsInput([...optionsInput, temp]);
    console.log(optionsInput);
  }

  const createProductHandler = () => {

        handleSubmit();

        let temp = {name: optName, discount: optDiscount, price: optPrice, countInStock: optQty}
    
        const newOptions = [...optionsInput, temp];

        var OptFields = newOptions.reduce((accumulator, option) => {let optionString=`{name: "${option.name}", price: ${option.price}, discount: ${option.discount}, countInStock: ${option.countInStock}},` 
        accumulator+=optionString;
        console.log(accumulator);
        console.log(optionsInput);
        return accumulator;
        }, "")
        console.log(OptFields);

        var newString = `[${OptFields}]`

        const query = `mutation {
          createProduct(productInput: {name: "${name}", discount: ${discount}, price: ${price}, options: ${newString}, image: "${image}", brand: "${brand}", category: "${categ}", subcategory: "${subCateg}", new: ${newArrival}, countInStock: ${countInStock}, numReviews: 0, description: "${description}"}) {
              name
              _id
          }
        }
        `;

        dispatch(createProduct(query));
        console.log("product created");
        // console.log(query);
        // history.push('/admin/productlist');
      // }
  };

//   const productUpdate = useSelector((state) => state.productUpdate);
//   const {
//     loading: loadingUpdate,
//     error: errorUpdate,
//     success: successUpdate,
//   } = productUpdate;

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: PRODUCT_UPDATE_RESET });
  //     history.push('/admin/productlist');
  //     } 
  //     else if (!product.name || product._id !== productId) {
  //       dispatch(listProductDetails(productId));
  //     } else {
  //       setName(product.name);
  //       setPrice(product.price);
  //       setImage(product.image);
  //       setBrand(product.brand);
  //       setCategory(product.category);
  //       setCountInStock(product.countInStock);
  //       setDescription(product.description);
  //   }
  // }, [dispatch, history, productId, product, successUpdate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       updateProduct({
//         _id: productId,
//         name,
//         image,
//         brand,
//         category,
//         description,
//         countInStock,
//       }),
//     );
//   };


  var ctr = 1;

  const [click, setClick] = useState([ctr]);

  const addNew = () => {
    setClick([...click, click+1 ]);
    console.log(click);
    handleSubmit();
    setOptName('');
    setOptPrice(0);
    setOptDiscount(0);
    setOptQty(0);
  }

  // const addOption = (oName, oPrice, oDiscount, oQty) => {
  //   setOptionsInput([...option, {optName: oName, optPrice: oPrice, optDiscount: oDiscount, optQty: oQty}]);
  //   console.log(option);
  // }

  useEffect(() => {
    // setOptionsInput([...option, sample]);
    console.log(optionsInput);
  }, [optionsInput]);

  // useEffect(() => {
  //   let temp = {name: optName, price: optPrice, discount: optDiscount, qty: optQty}
  //   setOptionsInput([...option, temp]);
  //   console.log(option);
  // }, [optQty, optName, optPrice, optDiscount]);

  // const [sample, setSample] = useState()
  // let sample = [];
  //           brands.map((br) => {
  //               let optionsTemp = {label: br.name, value: br._id}  
  //               optionsTwo.push(optionsTemp);
  //           })
  //           setOptionsInputList(optionsTwo);


  return (
    <div style={{padding: '120px 4rem'}}>
      <Link to="/admin/productlist" className="btn btn-light my-3" style={{border: '1px solid #D4D4D4'}}>
        Go Back
      </Link>
      <h1>Create Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form style={{ background: '#F9F9F9', padding: '3rem', marginBottom: '40px' }}>
            <Row style={{ marginBottom: '1rem' }}>
              <Col>
                <Row style={{ marginBottom: '1rem' }}>
                  <Col controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>

                  <Col controlId="brand">
                    <BrandDropdown brand={brand} setBrand = {setBrand} />
                  </Col>

                  <Col controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Col>
                  
                  <Col>
                    <Form.Group as={Col} controlId="countInStock">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row style={{ marginBottom: '1rem' }}>
                  <Col controlId="categ">
                    <CatDropdown categ={categ} setCateg={setCateg}/>
                  </Col>

                  <Col controlId="subCateg">
                      <SubCatDropdown categ={categ} subCateg={subCateg} setSubCateg={setSubCateg}/>
                    </Col>
                  
                  <Col controlId="discount">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Col>
                </Row>
              </Col>

              {/* <Col md={4}>
                <Table size="sm">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: '0',
                          border: 'none',
                          color: '#222831',
                        }}
                      >
                        <Form.Label>Size</Form.Label>
                      </td>
                      <td
                        style={{
                          padding: '0',
                          border: 'none',
                          color: '#222831',
                        }}
                      >
                        <Form.Label>Price</Form.Label>
                      </td>
                    </tr>
                    {sizes.map((s) => {
                      return (
                        <tr>
                          <SizeCol>{s.size}</SizeCol>
                          {prices.map((p) => {
                            return <SizeCol>{p.price}</SizeCol>;
                          })}
                        </tr>
                      );
                    })}
                    <tr>
                      <SizeCol
                        colSpan="2"
                        onClick={() => setModalShow(true)}
                      >
                        + Add size and price
                      </SizeCol>
                    </tr>
                  </tbody>
                </Table>
              </Col> */}
            </Row>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Check 
              type="switch"
              id="custom-switch"
              label="ADD TO NEW ARRIVALS"
              style={{marginTop: '2rem', fontWeight: '600'}}
              onClick={() => {setNewArrival(!newArrival); console.log(newArrival);}}
            />

            {/* 
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>
            */}

          </Form>
        </>
      )}
      <div>
        {click.map((c,index) => {
          return( 
            <div style={{ background: '#F9F9F9', padding: '3rem', marginBottom: '40px' }}> 
              <div>OPTION {index+1}</div>
              <NewOptions setOptName={setOptName} setOptPrice={setOptPrice} setOptDiscount={setOptDiscount} setOptQty={setOptQty} /> 
            </div> 
          );
        })}
      </div>
      <div style={{ background: '#F9F9F9', padding: '2rem 3rem', marginBottom: '40px', color: '#30475E', fontWeight: '600'}} onClick={addNew}>
      <i class="fas fa-plus" style={{marginRight: '15px'}}></i> ADD A NEW OPTION
      </div>
      <Col className="text-right">
        <Button style={{background: '#F05454'}} onClick={createProductHandler}>Save Changes</Button>
      </Col>
    </div>
  );
};

export default ProductCreateScreen;

const SizeCol = styled.td`
  border: 1px solid rgb(0, 0, 0, 0.05);
  background: rgb(255, 255, 255);
`;
