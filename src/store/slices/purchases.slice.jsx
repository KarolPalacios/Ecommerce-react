import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import axios from 'axios'
import {setIsLoading} from './isLoading.slice'

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', getConfig())
        .then((res) => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const createPurchaseThunk = (productToCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', productToCart, getConfig())
        .then(() => dispatch(getPurchasesThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
