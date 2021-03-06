// libs
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { BackgroundImage } from "../BackgroundImage";
// others
import style from "./Carousel.module.scss";

const IMAGE_PARTS = [...Array(4).keys()];
const AUTO_CHANGE_TIME = 4000;

type SLIDE = {
  /** title */
  title?: string;
  /** description */
  description?: string;
  /** imgSrc */
  imgSrc: string;
  /** readmoreLink */
  readmoreLink?: string;
  [key: string]: any;
};
type PROPS = {
  /** slides props */
  slides: SLIDE[];
  /** key of slides item */
  slideKey?: string;
};
/**
 * Carousel - Slider with full width only and Image-Part Effect
 */
export const Carousel = ({ slides, slideKey = "key" }: PROPS) => {
  const totalSlide = slides.length;
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(-1);
  const [isReady] = useState(true);

  const changeSlide = (unit: number) => {
    let nextSlide = activeSlide + unit;
    if (nextSlide < 0) nextSlide = totalSlide - 1;
    if (nextSlide >= totalSlide) nextSlide = 0;
    setActiveSlide(nextSlide);
    setPrevSlide(activeSlide);
  };
  const goToNextSlide = () => {
    changeSlide(1);
  };
  const goToPrevSlide = () => {
    changeSlide(-1);
  };

  useEffect(() => {
    const slideTimer = setTimeout(goToNextSlide, AUTO_CHANGE_TIME);

    return () => clearTimeout(slideTimer);
  });

  return (
    <div
      className={classNames(style.sliderWrapper, { [style.isReady]: isReady })}
    >
      <div className={style.sliderContainer}>
        {slides.map((slide, index) => (
          <div
            className={classNames(style.slide, {
              [style.isActive]: activeSlide === index,
              [style.isPrev]: prevSlide === index,
            })}
            key={slide[slideKey]}
          >
            <div className={style.slideContent}>
              <h2 className={style.slideHeading}>
                {slide?.title?.split("")?.map((letter: string, i: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span className={style.letter} key={i}>
                    {letter === " " ? <>&nbsp;</> : letter}
                  </span>
                ))}
              </h2>
              <h3 className={style.slideSubHeading}>{slide.description}</h3>
              {slide.readmoreLink && (
                <p className={style.readmore}>
                  <a href={slide.readmoreLink}>read more</a>
                </p>
              )}
            </div>
            <div className={style.bgPartContainer}>
              {IMAGE_PARTS.map((id) => (
                <div className={style.bgPart} key={id}>
                  <BackgroundImage
                    src={slide.imgSrc}
                    className={style.bgPartInner}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={style.sliderControl} onClick={goToPrevSlide} />
      <div
        className={classNames(style.sliderControl, style.sliderControlRight)}
        onClick={goToNextSlide}
      />
    </div>
  );
};
