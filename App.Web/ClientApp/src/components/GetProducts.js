import React, { Component } from 'react';
import UpdateProduct from './UpdateProduct';

export class GetProducts extends Component {
  static displayName = GetProducts.name;
  static requestOptions = {
    method: 'GET',
    headers: {}
  };


  constructor(props) {
    super(props);

    this.state = { 
      error: null,
      isLoaded: false, 
      products: [], 
      product: {}, 
      updateState: false, 
      deleteState: false 
    };
    
    this.getProducts = this.getProducts.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProduct = this.getProduct.bind(this);
  }
  
  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    var requestUrl = 'api/product/get-products';
    
    fetch(requestUrl, GetProducts.requestOptions)
      .then(response => response.json())
      .then(
          (result) => {
            this.setState({
              isLoaded: true,
              products: result,
              updateState: false,
              productId: 0
            });
        },
        (error) => {
            this.setState({
              isLoaded: true,
              error
            });
        }
      );
  }

  getProduct(productId) {
    fetch('api/product/get-product/' + productId, GetProducts.requestOptions)
      .then(response => response.json())
      .then(
          (result) => {
            this.setState({
              isLoaded: true,
              product: result
            });
        },
        (error) => {
            this.setState({
              isLoaded: true,
              error
            });
        }
      );
  }

  updateProduct(productId) {
    this.setState({
      updateState: true,
      productId: productId
    });
  }

  deleteProduct(productId) {
    const requestOptions = {
      method: 'DELETE',
      headers: {}
    };

    fetch('api/product/delete-product/' + productId, requestOptions)
      .then(response => response.json())
      .then(
          (result) => {
            this.setState({
              deleteState: true
            });

            this.getProducts();
        },
        (error) => {
            console.log(error);
        }
      );
  }
 

  renderProductsTable(products) {
      return ( 
        <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product =>
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{<button className="btn btn-secondary" onClick={this.updateProduct.bind(this, product.id)}>Edit</button>}</td>
              <td>{<button className="btn btn-danger" onClick={this.deleteProduct.bind(this, product.id)}>Delete</button>}</td>
            </tr>
        )}
      </tbody>
    </table>
      );
  }

  render() {
    const { error, isLoaded, products, product, productId, updateState } = this.state;  

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else { 
      if (!updateState) {
        return (
          <div>
            { this.renderProductsTable(products) }
          </div>
        );
      } else if (updateState) {
        return (
          <UpdateProduct productId={productId} ></UpdateProduct>
          //  handleGetProducts={this.getProducts}
        );
      }
      
    }
  }
}