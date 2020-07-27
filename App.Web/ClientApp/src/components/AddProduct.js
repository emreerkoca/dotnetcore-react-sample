import React, { Component } from 'react';

export class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            price: '',
            isAdded: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const requestOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: this.state.name,
              price: parseFloat(this.state.price)
          })
        };
  
        fetch('api/product/add-product', requestOptions)
          .then(
              (result) => {
                if (result.status === 200) {
                    this.setState({isAdded: true});

                    fetch('api/product/get-tags')
                        .then(response => response.json())
                        .then(data => console.log(data));
                }
            },
            (error) => {
                console.log(error);
            }
          );
    }

    handleProductNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleProductPriceChange(e) {
        this.setState({price: e.target.value});
    }


    render() {
        if (!this.state.isAdded) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-element">
                            <input type="text" id="productName" value={this.state.name} 
                            onChange={this.handleProductNameChange} placeholder="Name"/>
                        </div>
                        <div className="form-element">
                            <input type="text" id="productPrice" value={this.state.price} 
                            onChange={this.handleProductPriceChange} placeholder="Price" />
                        </div>
                        <div className="form-actions row">
                        <input type="submit" id="submit" className="btn btn-primary" value="Add"/>
                        </div>
                    </form>
                </div>
            );
        }
        else {
           return (
                 <div>
                <form>
                        <div className="form-element">
                            <input type="text" id="me" value={this.state.name} placeholder="asa" disabled={!this.state.isAdded} />
                        </div>
                        <div className="form-actions row">
                            <input type="submit" id="submit" className="btn btn-primary" value="Add" disabled={!this.state.isAdded} />
                        </div>
                    </form>
                </div>
            )
            
        }
      }
}