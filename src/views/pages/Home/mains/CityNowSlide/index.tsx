// libs
import React from "react";
// components
import Slider from "@/views/libs/Slider";
// datasource, mocks
import { cityNowSlide } from "@/mocks/Home";
// others
import style from "./CityNowSlide.module.scss";

const CityNowSlide = () => (
  <div className={style.wrapper}>
    <Slider slides={cityNowSlide} />
  </div>
);

export default CityNowSlide;