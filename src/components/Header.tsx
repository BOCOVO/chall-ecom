import React from "react"
import Logo from "../IconComponent/Logo"
import avatar from "../images/image-avatar.png"
import Cart from "../IconComponent/IconCart"
import { IconClose, IconMenu } from "../IconComponent"
import { useAppSelector } from '../redux/hooks';
import { CheckoutList } from "../redux/reducers/checkout"
import Badge from "./Utils/Badge"
import CheckoutListing from "./Checkout/CkeckoutList"
import Dropdown from "./Utils/Dropdown"


interface HeaderProps {
}

interface MenuItemProps {
    title: string,
    link?: string
}

const countInCheckout = (inCheckout: CheckoutList) => {
    let allCount = 0
    for (const key in inCheckout) {
        if (Object.prototype.hasOwnProperty.call(inCheckout, key)) {
            allCount += inCheckout[key];
        }
    }
    return allCount
}

const MenuItem = ({ title }: MenuItemProps) => {
    return (
        <li className="lg:mx-2 my-2 lg:my-0 lg:border-b-2 lg:border-b-transparent lg:hover:border-b-orange lg:py-6 font-bold lg:font-normal ">
            <a href="#">{title}</a>
        </li>
    )
}
const Header = ({ }: HeaderProps) => {



    const inCheckout = useAppSelector(state => state.checkout.list)

    const allCountInCheckout = countInCheckout(inCheckout)

    return (
        <div className="flex justify-center">
            <header className="max-w-1000 px-3 lg:px-0 lg:border-gray lg:border-b flex items-center lg:items-center py-4 lg:py-0 justify-between" role="banner" >
                <div className="flex items-center" >
                    <a href="#nav-bar">
                        <IconMenu className="fill-gray-dark hover:fill-orange cursor-pointer mr-4 block lg:hidden menu-toggler" />
                    </a>
                    <Logo />
                </div>
                <nav id="nav-bar" role="navigation" className="nav-bar z-10 bg-opacity-75 lg:block flex-1 ">
                    <div className="menus pl-4 pt-5 lg:pt-0 lg:ml-5 bg-white">
                        <a className="block lg:hidden" href="#">
                            <IconClose className="fill-gray-dark hover:fill-orange cursor-pointer mb-6" />
                        </a>
                        <ul className=" list-none flex flex-col lg:flex-row lg:items-center ">
                            <MenuItem title="Collection" />
                            <MenuItem title="Men" />
                            <MenuItem title="Woman" />
                            <MenuItem title="About" />
                            <MenuItem title="Contact" />
                        </ul>
                    </div>
                    <a href="#" className="menu-closer bg-opacity-75 bg-black"></a>
                </nav>
                <div className="flex items-center">
                    <Dropdown overlay={
                        <CheckoutListing />
                    }>
                        <Badge value={allCountInCheckout}>
                            <Cart />
                        </Badge>
                    </Dropdown>
                    <img src={avatar} className=" hover:border-orange hover:border-2 rounded-full avatar ml-4 lg:ml-7" />
                </div>
            </header>
        </div>
    )
}

export default Header