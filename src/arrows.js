"use strict";

import React from "react";
import { clsx } from "clsx";
import { canGoNext } from "./utils/innerSliderUtils";

export const PrevArrow = React.memo(
  ({
    currentSlide,
    slideCount,
    slidesToShow,
    infinite,
    prevArrow: customPrevArrow,
    clickHandler
  }) => {
    const disabled =
      !infinite && (currentSlide === 0 || slideCount <= slidesToShow);

    const prevClasses = {
      "slick-arrow": true,
      "slick-prev": true,
      "slick-disabled": disabled
    };

    const prevHandler = (e) => {
      if (e) {
        e.preventDefault();
      }
      clickHandler({ message: "previous" }, e);
    };

    const prevArrowProps = {
      key: "0",
      "data-role": "none",
      className: clsx(prevClasses),
      style: { display: "block" },
      onClick: disabled ? null : prevHandler
    };

    const customProps = { currentSlide, slideCount };

    if (customPrevArrow) {
      return React.cloneElement(customPrevArrow, {
        ...prevArrowProps,
        ...customProps
      });
    }

    return (
      <button key="0" type="button" {...prevArrowProps}>
        {" "}
        Previous
      </button>
    );
  }
);

export const NextArrow = React.memo(
  ({
    currentSlide,
    slideCount,
    nextArrow: customNextArrow,
    clickHandler,
    ...props
  }) => {
    const disabled = !canGoNext({ ...props, currentSlide, slideCount });

    const nextClasses = {
      "slick-arrow": true,
      "slick-next": true,
      "slick-disabled": disabled
    };

    const nextHandler = (e) => {
      if (e) {
        e.preventDefault();
      }
      clickHandler({ message: "next" }, e);
    };

    const nextArrowProps = {
      key: "1",
      "data-role": "none",
      className: clsx(nextClasses),
      style: { display: "block" },
      onClick: disabled ? null : nextHandler
    };

    const customProps = { currentSlide, slideCount };

    if (customNextArrow) {
      return React.cloneElement(customNextArrow, {
        ...nextArrowProps,
        ...customProps
      });
    }

    return (
      <button key="1" type="button" {...nextArrowProps}>
        {" "}
        Next
      </button>
    );
  }
);
