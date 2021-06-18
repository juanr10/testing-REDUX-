import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_PRODUCTS_DOWNLOAD,
    PRODUCTS_DOWNLOAD_SUCCESS,
    START_PRODUCTS_DOWNLOAD_ERROR
} from '../types';


/**
 * @name: addNewProductAction.
 * @description: Add a new product to the database.
 * @param: product to add.
 * @return: none.
*/
export function addNewProductAction(product){
    return async (dispatch) => {
        dispatch(addProduct());

        try {
            await axiosClient.post('/products', product);
            dispatch(addProductSuccess(product));

            //SweetAlert2
            Swal.fire(
                'Success.',
                'The product has been added successfully.',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch(addProductError(true));

            //SweetAlert2
            Swal.fire(
                'Error.',
                'There is an unexpected error on the server.',
                'error'
            );
        }
    }
}

/**
 * @name: getProductsAction.
 * @description: download products from the database.
 * @param: none.
 * @return: none.
*/
export function getProductsAction() {
    return async (dispatch) => {
        dispatch(downloadProducts());
    }
}

/**
 * @name: addProduct.
 * @description: Sets the loading status to true until a new product is added.
 * @param: none.
 * @return: none.
*/
const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

/**
 * @name: addProductSuccess.
 * @description: Add the added product to the global products state.
 * @param: product added.
 * @return: none.
*/
const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

/**
 * @name: addProductError.
 * @description: Passes a boolean variable to indicate that there has been an error in @addNewProductAction.
 * @param: error.
 * @return: none.
*/
const addProductError = error => ({
    type: ADD_PRODUCT_ERROR,
    payload: error
});

/**
 * @name: downloadProducts.
 * @description: Call action @getProductsAction from productActions to get products.
 * @param: none.
 * @return: none.
*/
const downloadProducts = () => ({
    type: START_PRODUCTS_DOWNLOAD,
    payload: true
});