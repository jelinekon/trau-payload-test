'use client'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules'
import { useEffect, useRef, useState } from 'react'

import 'swiper/css'

// import { Swiper as SwiperClass} from 'swiper/types';

import Arrow from '@/../public/ui/arrow.svg'
import { cn } from '@/utilities/ui'
// import ArrowRight from "/public/arrow-right.svg";

interface CarouselProps {
  // activeIndex?: number | undefined;
  allowTouchMove?: boolean
  autoPlay?: boolean
  className?: string
  children: React.ReactNode[]
  slideClassName?: string
  centeredSlides?: boolean
  loop?: boolean
  effect?: 'fade' | 'slide'
  slidesPerView?: number | 'auto'
  // handleActiveIndex?: (index: number) => void;
  setActiveIndex?: (index: number) => void
  withNavigation?: boolean
  withPagination?: boolean
  navigationClasses?: string
  paginationClasses?: string
}

const Carousel: React.FC<CarouselProps> = ({
  className,
  children,
  loop = false,
  slideClassName,
  autoPlay = false,
  effect = 'fade',
  allowTouchMove = true,
  centeredSlides = false,
  slidesPerView = 1,
  setActiveIndex,
  withNavigation = false,
  withPagination = false,
  navigationClasses,
  paginationClasses,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | false>(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const navigationItemClasses =
    'w-8 h-8 bg-black/10 rounded-full group flex items-center justify-center cursor-pointer'

  return (
    <>
      <Swiper
        allowTouchMove={allowTouchMove}
        autoplay={
          autoPlay
            ? {
                delay: 5000,
                disableOnInteraction: true,
              }
            : false
        }
        className={cn(className, 'h-full w-full')}
        speed={500}
        effect={effect}
        fadeEffect={
          effect === 'fade'
            ? {
                crossFade: true,
              }
            : undefined
        }
        loop={loop}
        slidesPerView={slidesPerView}
        modules={[Pagination, Navigation, EffectFade, Autoplay]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper)
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex)
          if (setActiveIndex) {
            setActiveIndex(swiper.realIndex)
          }
        }}
      >
        {children?.map((child, i) => (
          <SwiperSlide key={i} className={cn(slideClassName)}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      {withPagination && (
        <ul
          className={cn('absolute z-10 flex justify-center gap-1', paginationClasses, {
            'bottom-3 right-4': !paginationClasses,
          })}
        >
          {children?.map((child, i) => (
            <li
              key={i}
              className="flex items-end h-1 cursor-pointer"
              onClick={() => {
                if (swiperInstance) {
                  swiperInstance.slideTo(i)
                }
              }}
            >
              <span
                className={cn(
                  'block w-[0.375rem] h-[0.375rem] bg-white rounded-full transition-all',
                  {
                    'opacity-30': currentIndex !== i,
                  },
                )}
              ></span>
            </li>
          ))}
        </ul>
      )}
      {withNavigation && (
        <div
          className={cn('flex absolute -top-1 right-0 z-10', {
            // 'pr-2 md:justify-end md:pr-4': !navigationClasses,
          })}
        >
          <ul
            className={cn('flex gap-1', {
              // 'mt-4 md:mt-8': !navigationClasses,
              'opacity-0 pointer-events-none': swiperInstance?.isLocked,
            })}
          >
            <li
              // ref={slidePrevRef}
              className={cn(navigationItemClasses)}
              onClick={() => {
                if (swiperInstance) {
                  if (swiperInstance.isBeginning && !loop) {
                    swiperInstance.slideTo(swiperInstance.slides.length - 1)
                  } else {
                    swiperInstance.slidePrev()
                  }
                }
              }}
            >
              <span className="block w-4 transition-transform rotate-180 group-hover:-translate-x-[0.15em]">
                <Arrow />
              </span>
            </li>
            <li
              className={cn(navigationItemClasses)}
              onClick={() => {
                if (swiperInstance) {
                  if (swiperInstance.isEnd && !loop) {
                    swiperInstance.slideTo(0)
                  } else {
                    swiperInstance.slideNext()
                  }
                }
              }}
            >
              <span className="block w-4 transition-transform group-hover:translate-x-[0.15em]">
                <Arrow />
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Carousel
