import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR
} from '../types';

//Add new products
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

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
});

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

const addProductError = error => ({
    type: ADD_PRODUCT_ERROR,
    payload: error
})