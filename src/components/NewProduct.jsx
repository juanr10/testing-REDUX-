import React, {useState} from 'react';
//Redux 
import {useDispatch, useSelector} from 'react-redux';
import {addNewProductAction} from '../actions/productActions';

const NewProduct = ({history}) => {
    //State component
    const [name, saveName] = useState('');
    const [price, savePrice] = useState(0);

    //Using dispatch to create a function
    const dispatch = useDispatch();

    //Store state access
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);

    /**
     * @name: addProduct.
     * @description: Call action @addNewProductAction from productActions passing a product.
     * @param: product to add.
     * @return: none.
    */
    const addProduct = (product) => dispatch(addNewProductAction(product));

    /**
     * @name: submit.
     * @description: Verify if the product data is correct and if so, create a new product..
     * @param: Juan Argudo.
     * @return: none.
    */
    const submit = e => {
        e.preventDefault();
        
        //Validate
        if(name.trim() === '' || price <= 0) {
            return;
        }

        //Add product
        addProduct({
            name,
            price
        });

        //Home redirection
        history.push('/');
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>

                        <form onSubmit={submit} action="">
                            <div className="form-group">
                                <label htmlFor="">Product Name</label>
                                <input type="text" className="form-control" placeholder="Product Name" name="name" value={name} onChange={e => saveName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Product Price</label>
                                <input type="number" className="form-control" placeholder="Product Price" name="price" value={price} onChange={e => savePrice(Number.parseFloat(e.target.value))}/>
                            </div>
                            <button type="submit" className="btn btn-primary font-weight-bold d-block w-100">Add</button>
                        </form>

                        {/* Poner spinner */}
                        {loading ? <p>Loading...</p> : null}
                        {error ? <p className="alert alert-danger p-2 mt-4 text-center">There is an unexpected error. Please try again.</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NewProduct;