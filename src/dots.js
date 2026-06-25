"use strict";

import React from "react";
import { clsx } from "clsx";
import { clamp } from "./utils/innerSliderUtils";

const getDotCount = ({
  infinite,
  slideCount,
  slidesToScroll,
  slidesToShow
}) => {
  if (infinite) {
    return Math.ceil(slideCount / slidesToScroll);
  } else {
    return Math.ceil((slideCount - slidesToShow) / slidesToScroll) + 1;
  }
};

export const Dots = React.memo(
  ({
    infinite,
    slidesToScroll,
    slidesToShow,
    slideCount,
    currentSlide,
    clickHandler,
    customPaging,
    appendDots,
    dotsClass,
    onMouseEnter,
    onMouseOver,
    onMouseLeave
  }) => {
    const dotCount = getDotCount({
      slideCount,
      slidesToScroll,
      slidesToShow,
      infinite
    });

    const mouseEvents = { onMouseEnter, onMouseOver, onMouseLeave };

    let dots = [];
    for (let i = 0; i < dotCount; i++) {
      const _rightBound = (i + 1) * slidesToScroll - 1;
      const rightBound = infinite
        ? _rightBound
        : clamp(_rightBound, 0, slideCount - 1);
      const _leftBound = rightBound - (slidesToScroll - 1);
      const leftBound = infinite
        ? _leftBound
        : clamp(_leftBound, 0, slideCount - 1);

      const className = clsx({
        "slick-active": infinite
          ? currentSlide >= leftBound && currentSlide <= rightBound
          : currentSlide === leftBound
      });

      const dotOptions = {
        message: "dots",
        index: i,
        slidesToScroll,
        currentSlide
      };

      const onClick = (e) => {
        // In Autoplay the focus stays on clicked button even after transition
        // to next slide. That only goes away by click somewhere outside
        e.preventDefault();
        clickHandler(dotOptions);
      };
      dots = dots.concat(
        <li key={i} className={className}>
          {React.cloneElement(customPaging(i), { onClick })}
        </li>
      );
    }

    return React.cloneElement(appendDots(dots), {
      className: dotsClass,
      ...mouseEvents
    });
  }
);
