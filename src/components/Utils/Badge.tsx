import React from "react"

interface BadgeProps {
    value: number | string,
    children: React.ReactNode
}

const Badge = ({value,children}:BadgeProps)=>{
    return (
        <div className=" relative">
            {value ? <span className="badge-text font-bold rounded-xl block text-white bg-orange px-2 absolute left-1" >{value}</span> : null}
            {children}
        </div>
    )
}

export default Badge