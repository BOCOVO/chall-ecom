import React, { useEffect, useLayoutEffect, useState } from "react"

interface ModalProps {
    visible: boolean,
    children: React.ReactNode,
    onClose: () => void
}


const Modal = ({visible,children,onClose}:ModalProps) => {

    const [mousePosition,setMousePosition] = useState(null)

    const updatePosition  = (e:MouseEvent) => {
        setMousePosition({x: e.clientX ,y:e.clientY})
    }

    useLayoutEffect(()=>{
        document.documentElement.addEventListener("click",updatePosition,true)
        return( ) => document.documentElement.removeEventListener("click",updatePosition)
    },[])

    /*
    useEffect(()=>{
        if(mousePosition){
            setTimeout(()=>{
                setMousePosition(null)
            },100)
        }
    },[mousePosition])*/

    const maskStyle = {
        top:  mousePosition && mousePosition.y,
        left:  mousePosition && mousePosition.x
    }

    return (
        visible ?
            <div onClick={onClose} style={maskStyle} className=" flex items-center justify-center bg-black bg-opacity-75 fixed modal-mask">
                <div onClick={ e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        : null
    )
}

export default Modal