import React from 'react'
import Header from './Header'
import Product from './Product/Product'
import image1 from "../images/image-product-1.jpg"
import image2 from "../images/image-product-2.jpg"
import image3 from "../images/image-product-3.jpg"
import image4 from "../images/image-product-4.jpg"
import thumb1 from "../images/image-product-1-thumbnail.jpg"
import thumb2 from "../images/image-product-2-thumbnail.jpg"
import thumb3 from "../images/image-product-3-thumbnail.jpg"
import thumb4 from "../images/image-product-4-thumbnail.jpg"

const Main : React.FC = () => {
    
    return (
        <div>
            <Header />
            <Product 
            images={[image1,image2,image3,image4]}
            thumbs={[thumb1,thumb2,thumb3,thumb4]}
            title="Fall Limited Edition Sneakers" 
            description='These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.' 
            price={250}
            id={"f-p"}
            discount={50}
             />
        </div>
    )
}

export default Main