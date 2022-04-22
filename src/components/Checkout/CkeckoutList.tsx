import React from "react"
import { useAppSelector } from '../../redux/hooks';
import CheckoutItem, { CheckoutItemProps } from './CheckoutItem';
import { CheckoutList } from '../../redux/reducers/checkout';
import thumb from "../../images/image-product-1-thumbnail.jpg"

const makeCheckoutList = (checkoutObject: CheckoutList) => {
    const list: Array<CheckoutItemProps> = []
    for (const id in checkoutObject) {
        if (Object.prototype.hasOwnProperty.call(checkoutObject, id)) {
            // Using fake data, an product store must be used
            list.push({
                id,
                title: "Fall Limited Edition Sneakers",
                count: checkoutObject[id],
                price: 125,
                thumb
            })
        }
    }
    return list
}

interface CheckoutListingProps {

}

const CheckoutListing = ({ }: CheckoutListingProps) => {

    const inCheckout = useAppSelector(state => state.checkout.list)


    const usableList = makeCheckoutList(inCheckout)
    
    return (
        <div className="checkout-list rounded-xl sticky right-1 bg-white pb-6 max-w-xs w-screen m-2 shadow-2xl z-50">
            <h6 className=" mx-3 my-3 font-bold">Cart</h6>
            <div className=" border-b border-b-gray"></div>
            {
            usableList.length ?
            <div className=" mx-3">
                {
                    usableList.map((v) => {
                        return <CheckoutItem key={v.id} {...v} ></CheckoutItem>
                    })
                }
                <button className="mt-2 py-2 text-center bg-orange text-white rounded-lg w-full">Checkout</button>
            </div>
            : 
            <div className=" my-12 flex justify-center"> 
            <span className=" font-bold">Your cart is empty</span>
            </div>
            }
        </div>
    )
}

export default CheckoutListing