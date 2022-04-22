import React from "react"
import { formatPrice } from '../../utils/helpers';
import SvgIconDelete from '../../IconComponent/IconDelete';
import { removeFromCheckout as remover } from '../../redux/reducers/checkout';
import { useAppDispatch } from "../../redux/hooks";


export interface CheckoutItemProps {
    title: string,
    thumb: string,
    price: number,
    count: number,
    id: number | string
}

const CheckoutItem = ({title,thumb,price,count,id}:CheckoutItemProps) => {

    const dispatcher = useAppDispatch()

    const removeFromCheckout = () => {
        dispatcher(remover(id))
    }

    return(
        <div className=" flex items-center my-2 ">
            <img src={thumb} className=" rounded-md mr-3 w-12" />
            <div>
                <span className=" text-ellipsis text-gray-dark">{title}</span>
                <div>
                    <span className="text-gray-dark">{formatPrice(price)}x{count}</span>
                    <span className="ml-2 font-bold">{ formatPrice(price*count) }</span>
                </div>
            </div>
            <SvgIconDelete onClick={removeFromCheckout} className=" mx-3 fill-gray hover:fill-orange "/>
        </div>
    )
}

export default CheckoutItem