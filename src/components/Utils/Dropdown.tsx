import React from "react"

interface DropdownProps {
    children: React.ReactNode,
    overlay: React.ReactNode
}

const Dropdown = ({ children, overlay }: DropdownProps) => {

    return (
        <div className="dropdown">
            <div>{children}</div>
            <div className=" relative flex lg:justify-center justify-end">
                <div className="dropdown-overlay absolute hidden">{overlay}</div>
            </div>
        </div>
    )
}

export default Dropdown