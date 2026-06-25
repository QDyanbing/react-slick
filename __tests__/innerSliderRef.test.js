import React from "react";
import { render, waitFor } from "@testing-library/react";
import Slider from "../src/slider";
import { InnerSlider } from "../src/inner-slider";
import defaultProps from "../src/default-props";

const slides = [
  <div key="1">1</div>,
  <div key="2">2</div>,
  <div key="3">3</div>
];

describe("InnerSlider ref", () => {
  it("should expose imperative methods and state", async () => {
    const innerSliderRef = React.createRef();

    render(
      <InnerSlider
        ref={innerSliderRef}
        {...defaultProps}
        speed={0}
        useCSS={false}
      >
        {slides}
      </InnerSlider>
    );

    expect(typeof innerSliderRef.current.slickNext).toBe("function");
    expect(typeof innerSliderRef.current.autoPlay).toBe("function");
    expect(innerSliderRef.current.state.currentSlide).toBe(0);

    innerSliderRef.current.slickGoTo(2, true);
    await waitFor(() => {
      expect(innerSliderRef.current.state.currentSlide).toBe(2);
    });
  });

  it("should keep Slider innerSlider ref behavior", async () => {
    const sliderRef = React.createRef();

    render(
      <Slider ref={sliderRef} speed={0} useCSS={false}>
        {slides}
      </Slider>
    );

    expect(typeof sliderRef.current.innerSlider.slickNext).toBe("function");
    expect(sliderRef.current.innerSlider.state.currentSlide).toBe(0);

    sliderRef.current.slickGoTo(2, true);
    await waitFor(() => {
      expect(sliderRef.current.innerSlider.state.currentSlide).toBe(2);
    });
  });

  it("should support Slider ref calls from parent effects", async () => {
    const sliderRef = React.createRef();
    const EffectSlider = () => {
      React.useEffect(() => {
        sliderRef.current.slickGoTo(1, true);
      }, []);

      return (
        <Slider ref={sliderRef} speed={0} useCSS={false}>
          {slides}
        </Slider>
      );
    };

    render(<EffectSlider />);

    await waitFor(() => {
      expect(sliderRef.current.innerSlider.state.currentSlide).toBe(1);
    });
  });
});
