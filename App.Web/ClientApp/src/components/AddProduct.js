import React, { Component } from 'react';

export class AddProduct extends Component {
    static requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            price: '',
            isAdded: false,
            tags: [],
            selectedTag: '',
            tagValue: '',
            validationError: ''
        }

        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
        this.handleTagValueChange = this.handleTagValueChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddTagFormSubmit = this.handleAddTagFormSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        AddProduct.requestOptions.body = JSON.stringify({
            name: this.state.name,
            price: parseFloat(this.state.price)
        });
  
        fetch('api/product/add-product', AddProduct.requestOptions)
            .then(response => response.json())
            .then(
              (result) => {
                this.setState({id: result.id, isAdded: true});


                fetch('api/product/get-tags')
                    .then(response => response.json())
                    .then(data => {
                        this.setState({tags: data});
                    });
            },
            (error) => {
                console.log(error);
            }
          );
    }

    handleAddTagFormSubmit(e) {
        e.preventDefault();

        AddProduct.requestOptions.body = JSON.stringify({
            TagId: this.state.selectedTag,
            ProductId: this.state.id,
            TagValue: this.state.tagValue
        });

        console.group(AddProduct.requestOptions);

        fetch('api/product/add-product-tag', AddProduct.requestOptions)
        .then(
            (result) => {
              if (result.status === 200) {
                  console.log("result:");
                  console.log(result);
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

    handleTagValueChange(e) {
        this.setState({tagValue: e.target.value});
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
                            <input type="number" id="productPrice" value={this.state.price} 
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
                <form onSubmit={this.handleAddTagFormSubmit}>
                        <div className="form-element">
                        <select value={this.state.selectedTag }
                                onChange={(e) => {
                                    this.setState({ selectedTag: parseInt(e.target.value),
                                        validationError: e.target.value === '' ? 'Select Tag' : ''});                                    
                                }}>
                            {this.state.tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                        </select>
                        <div style={{color: 'red', marginTop: '5px'}}>
                            {this.state.validationError}
                        </div>
                        </div>
                        <div className="form-element">
                            <input type="text" id="tagValue" value={this.state.tagValue}
                            onChange={this.handleTagValueChange} placeholder="Tag Value" />
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