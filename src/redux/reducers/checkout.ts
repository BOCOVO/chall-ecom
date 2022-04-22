import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CheckoutList {
    [key: string]: number
}

interface AddToCheckout {
    id: string | number,
    amount: number
}

interface CheckoutState {
  list: CheckoutList
}

const initialState: CheckoutState = {
  list: {}
}

export const checkoutReducer = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addToCheckout: (state,action: PayloadAction<AddToCheckout>) => {
        // add product to checkout
        state.list[action.payload.id] = action.payload.amount
    },
    removeFromCheckout: (state,action: PayloadAction<string|number>) => {
        // remove product from checkout
        delete state.list[action.payload]
    },
  },
})

export const { addToCheckout, removeFromCheckout } = checkoutReducer.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.checkout.list

export default checkoutReducer.reducer