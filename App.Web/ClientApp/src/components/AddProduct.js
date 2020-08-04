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
            productTags: [],
            selectedTag: '',
            selectedTagName: '',
            tagValue: '',
            validationError: ''
        }

        this.handleProductNameChange = this.handleProductNameChange.bind(this);
        this.handleProductPriceChange = this.handleProductPriceChange.bind(this);
        this.handleTagValueChange = this.handleTagValueChange.bind(this);
        this.handleGetProducts = this.handleGetProducts.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddTagFormSubmit = this.handleAddTagFormSubmit.bind(this);
    }

    getTags() {
        fetch('api/product/get-tags')
            .then(response => response.json())
            .then(data => {
                this.setState({tags: data});
            });
    };

    getProductTags() {
        this.setState({
            productTags: []
        });

        if (this.props.productId) {
            fetch('api/product/get-product-tags/' + this.props.productId,
        {
            method: 'GET',
            headers: {}
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    productTags: result
                });
            }
        );
        }
    }

    handleGetProducts() {
        this.props.handleGetProducts();
    }

    componentDidMount() {
        if (this.props.productId) {
            fetch('api/product/get-product/' + this.props.productId,
            {
                method: 'GET',
                headers: {}
            })
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        id: result.id,
                        name: result.name,
                        price: result.price,
                        isAdded: true
                    });

                    this.getTags();
                    this.getProductTags();
                }
            );
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        AddProduct.requestOptions.body = JSON.stringify({
            name: this.state.name,
            price: parseFloat(this.state.price)
        });

        if (!this.state.isAdded) {
            fetch('api/product/add-product', AddProduct.requestOptions)
            .then(response => response.json())
            .then(
              (result) => {
                this.setState({id: result.id, isAdded: true});


                this.getTags();
            },
            (error) => {
                console.log(error);
            }
          );
        }
        else {
            AddProduct.requestOptions.method = "PUT";

            var requestBody = JSON.parse(AddProduct.requestOptions.body);

            requestBody.id = this.state.id;

            AddProduct.requestOptions.body = JSON.stringify(requestBody);

            fetch('api/product/update-product/' + this.state.id, AddProduct.requestOptions)
                .then(response => response.json())
                .then(
                (result) => {
                    console.log("Product updated!");
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
          );
        }      
    }

    handleAddTagFormSubmit(e) {
        e.preventDefault();

        AddProduct.requestOptions.method = "POST";
        AddProduct.requestOptions.body = JSON.stringify({
            TagId: this.state.selectedTag,
            ProductId: this.state.id,
            TagName: this.state.selectedTagName,
            TagValue: this.state.tagValue
        });

        fetch('api/product/add-product-tag', AddProduct.requestOptions)
        .then(response => response.json())
        .then(
            (result) => {
                var productTags = this.state.productTags;

                productTags.push(result);

                this.setState({productTags: productTags });
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
                    { this.props.productId && <input type="button" onClick={this.handleGetProducts} value="Back to Products"/>}
                    <input type="submit" id="submit" value={this.state.isAdded ? "Update" : "Add" }/>
                    </div>
                </form>
                { this.state.productTags.length > 0 && 
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Tag Name</th>
                                    <th>Value</th>
                                </tr>
                                {(this.state.productTags || []).map((productTag) => 
                                    <tr key={productTag.id}>
                                        <td>{productTag.tagName}</td>
                                        <td>{productTag.tagValue}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                }
                { this.state.isAdded && 
                <div>
                <form onSubmit={this.handleAddTagFormSubmit}>
                        <div className="form-element">
                            <label>Add Product Property (Color, Size, etc)</label>
                            <br />
                            <select value={this.state.selectedTag }
                                    onChange={(e) => {
                                        this.setState({ selectedTag: parseInt(e.target.value),
                                            selectedTagName: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,
                                            validationError: e.target.value === '' ? 'Select Property' : ''});                                    
                                    }}>
                                {this.state.tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                            </select>
                            <div style={{color: 'red', marginTop: '5px'}}>
                                {this.state.validationError}
                            </div>
                        </div>
                        <div className="form-element">
                            <input type="text" id="tagValue" value={this.state.tagValue}
                            onChange={this.handleTagValueChange} placeholder="Value" />
                        </div>
                        <div className="form-actions row">
                            <input type="submit" id="submit" className="btn btn-primary" value="Add" disabled={!this.state.isAdded} />
                        </div>
                    </form>
                </div>
                }     
            </div>
        );
      }
}