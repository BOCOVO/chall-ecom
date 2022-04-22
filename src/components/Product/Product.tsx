import React from "react"
import { formatPrice } from "../../utils/helpers"
import Carousel from "./Carousel"
import SvgIconCart from '../../IconComponent/IconCart';
import { useAppDispatch } from '../../redux/hooks';
import { addToCheckout } from "../../redux/reducers/checkout";
import { useState } from 'react';

interface ProductProps {
    title: string,
    description: string,
    price: number,
    discount: number,
    id: number | string,
    images: string[],
    thumbs: string[]
}

const Product = ({ title, description, price, discount, id, images,thumbs }: ProductProps) => {


    const [count,setCount] = useState(0)

    const dispatcher = useAppDispatch()

    const updateCkeckout = () => {
        if(count < 0) return
        dispatcher(addToCheckout( {amount:count,id} ))
    }   

    // add one to chekout
    const addOne = () => setCount(count+1)
    // sub one from checkout
    const subOne = () => setCount(count ?count-1:0)
    
    const finalPrice = formatPrice(price * (1 - (discount / 100)))

    return (
        <div className=" flex justify-center">
            <div className="max-w-1000 flex items-center lg:justify-center lg:mt-20 flex-col md:flex-row">
                <div className=" w-full md:w-2/5 lg:max-w-sm md:px-5">
                    <Carousel thumbs={thumbs} images={images} />
                </div>
                <div className=" w-full px-3 md:w-3/5 lg:max-w-lg lg:ml-10 md:px-5">
                    <span className=" uppercase text-orange mt-4 block font-bold">Sneaker Company</span>
                    <h4 className="pt-2 md:pt-3 font-bold text-4xl" >{title}</h4>
                    <p className=" text-base mt-3 md:mt-4 text-gray-dark" >{description}</p>
                    <div className=" flex pt-3  flex-row justify-between md:justify-start md:flex-col items-center md:items-start ">
                        <div className="md:pt-4">
                            <span className="font-bold text-2xl">{finalPrice}</span>
                            <span className=" text-orange font-bold bg-pale-orange rounded mx-2 p-1">{discount}%</span>
                        </div>
                        <span className=" text-gray font-bold line-through">{formatPrice(price)}</span>
                    </div>
                    <div className=" flex flex-col sm:flex-row items-start mt-5">
                        <div className=" inline-flex w-full md:w-fit  bg-gray-light py-3 px-3 justify-between rounded-lg items-center font-bold ">
                            <button disabled={!count} onClick={subOne} aria-controls={id + "product-number"} className="text-orange hover:text-opacity-70 font-bold disabled:opacity-60">-</button>
                            <input onChange={e=>setCount(Number(e.target.value))} value={count} id={id + "product-number"} type="number" min={1} className=" bg-transparent md:w-24 font-bold input-appearance-none outline-none text-center" />
                            <button onClick={addOne} aria-controls={id + "product-number"} className="text-orange hover:text-opacity-70 font-bold disabled:opacity-60">+</button>
                        </div>
                        <button onClick={updateCkeckout} disabled={!count} className=" inline-flex  justify-center w-full md:w-fit md:px-12 lg:px-20 disabled:opacity-60 bg-orange hover:bg-opacity-70 text-white mt-4 md:mt-0 md:ml-4 py-3 px-3 rounded-lg shadow-orange shadow-2xl"> <SvgIconCart className="mr-2" /> Add to cart</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Product