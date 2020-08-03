import React, { Component } from 'react';

export default class UpdateProduct extends React.Component {
    static requestOptions = {
        method: 'GET',
        headers: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            product: {
                id: '',
                name: '',
                price: ''
            }
        };
    
        this.handleGetProducts = this.handleGetProducts.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
    }

    componentDidMount() {
       fetch('api/product/get-product/' + this.props.productId, UpdateProduct.requestOptions)
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

    handleGetProducts() {
        this.props.handleGetProducts();
    }

    handleProductNameChange(e) {
        this.setState({
            product: {
                id: this.state.product.id,
                name: e.target.value,
                price: this.state.product.price
            }
        });
    }
    
    handleProductPriceChange(e) {
        this.setState({
            product: {
                id: this.state.product.id,
                name: this.state.product.name,
                price: parseFloat(e.target.value)
            }
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.product)
          };
    
          fetch('api/product/update-product/' + this.props.productId, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result);

                    alert('Product updated');
                },
              (error) => {
                  console.log(error);
              }
            );
    }

    render() {
        const { isLoaded, error, product } = this.state; 

        if (isLoaded && !error) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit} >
                    <div className="form-element">
                    <input type="text" id="productName" value={product.name} 
                        onChange={this.handleProductNameChange} placeholder="Name"/>
                    </div>
                    <div className="form-element">
                    <input type="number" id="productPrice" value={product.price} 
                        onChange={this.handleProductPriceChange} placeholder="Price" />
                    </div>
                    <div className="form-actions row">
                    <input type="button" onClick={this.handleGetProducts} value="Back to Products"/>
                    <input type="submit" id="submit" value="Update"/>
                    </div>
                </form>
                </div> 
            );
        } else if (isLoaded && error) {
            return (
                error
            );
        }
        else {
            return null;
        }
        
    }
}