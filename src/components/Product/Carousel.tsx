import React from "react"
import { Navigation, A11y, Thumbs, FreeMode, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react';
import "swiper/css"
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { IconClose, IconNext, IconPrevious } from "../../IconComponent";
import Modal from "../Utils/Modal";

interface CarouselProps {
    images: string[],
    thumbs: string[]
}

interface OpenModal {
    openModal ?: ()=>void
}

interface CarouselPropsWithOpen extends OpenModal  {
    images: string[],
    thumbs: string[],
    forceShowNav?: boolean,
    smallTumbs?: boolean
}


const Carousel = ({ images, thumbs , openModal ,smallTumbs = false , forceShowNav = false }: CarouselPropsWithOpen) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0)
    const goNext = () => {
        console.log(thumbsSwiper)
        if(thumbsSwiper)thumbsSwiper.slideNext()
    }

    const goPrev = () => {
        if(thumbsSwiper)thumbsSwiper.slidePrev()
    }

    return (
        <div className=" relative z-0">
            <div className=" relative flex items-center">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.activeIndex)
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    autoplay
                    modules={[A11y, Navigation, FreeMode, Thumbs, Autoplay]}>
                    {
                        images.map((image, index) =>
                            <SwiperSlide onClick={openModal} key={index}>
                                <img src={image} className=" w-full md:rounded-2xl" />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
                <button onClick={goPrev} className={`${ forceShowNav ? " -left-4" : "md:hidden left-2" } stroke-vark-blue hover:stroke-orange z-10 absolute flex items-center justify-center w-9 h-9 bg-white rounded-full`} >
                    <IconPrevious />
                </button> 
                <button onClick={goNext} className={`${ forceShowNav ? " -right-4" : "md:hidden right-2" } stroke-vark-blue hover:stroke-orange z-10 absolute flex items-center justify-center w-9 h-9 bg-white rounded-full`} >
                    <IconNext  />
                </button>
            </div>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={20}
                slidesPerView={thumbs.length}
                freeMode={true}
                watchSlidesProgress={true}
                autoplay
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className={` hidden md:block mt-4 ${ smallTumbs && "w-4/5"}`}>
                {
                    thumbs.map((image, index) =>
                        <SwiperSlide key={index}>
                            <div
                                className={" cursor-pointer hover:border-orange rounded-md overflow-hidden " + (activeIndex === index ? "border-orange border-2" : "")}>
                                <img src={image} className={" hover:contrast-50 w-full" + (activeIndex === index ? " contrast-50" : "")} />
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>

    )
}

const CarouselWithModal = (props:CarouselProps) =>{
    
    const [modalVisible,setModalVisible] = useState(false)
    
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return(
        <div>
            <Carousel openModal={toggleModal} {...props} />
            <Modal onClose={toggleModal} visible={modalVisible} >
                <div className=" max-w-sm px-10 w-full">
                    <button onClick={toggleModal} className="mb-3 w-full hover:fill-orange fill-white mt-1 flex justify-end">
                        <IconClose />
                    </button>
                    <Carousel forceShowNav smallTumbs {...props} />
                </div>
            </Modal>
        </div>
    )
}

export default CarouselWithModal