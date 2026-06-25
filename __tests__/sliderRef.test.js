import React from "react";
import { render, waitFor } from "@testing-library/react";
import sinon from "sinon";
import Slider from "../src/slider";

describe("Slider ref", () => {
  it("should expose imperative methods", () => {
    const sliderRef = React.createRef();
    render(
      <Slider ref={sliderRef} speed={0}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider>
    );

    const innerSlider = sliderRef.current.innerSlider;
    innerSlider.slickPrev = sinon.spy();
    innerSlider.slickNext = sinon.spy();
    innerSlider.slickGoTo = sinon.spy();
    innerSlider.pause = sinon.spy();
    innerSlider.autoPlay = sinon.spy();

    sliderRef.current.slickPrev();
    sliderRef.current.slickNext();
    sliderRef.current.slickGoTo(2, true);
    sliderRef.current.slickPause();
    sliderRef.current.slickPlay();

    expect(innerSlider.slickPrev.calledOnce).toBe(true);
    expect(innerSlider.slickNext.calledOnce).toBe(true);
    expect(innerSlider.slickGoTo.calledWith(2, true)).toBe(true);
    expect(innerSlider.pause.calledWith("paused")).toBe(true);
    expect(innerSlider.autoPlay.calledWith("play")).toBe(true);
  });

  it("should expose innerSlider state through imperative methods", async () => {
    const sliderRef = React.createRef();
    render(
      <Slider ref={sliderRef} speed={0} useCSS={false}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Slider>
    );

    expect(sliderRef.current.innerSlider.state.currentSlide).toBe(0);

    sliderRef.current.slickGoTo(2, true);
    await waitFor(() => {
      expect(sliderRef.current.innerSlider.state.currentSlide).toBe(2);
    });

    sliderRef.current.slickPrev();
    await waitFor(() => {
      expect(sliderRef.current.innerSlider.state.currentSlide).toBe(1);
    });

    sliderRef.current.slickNext();
    await waitFor(() => {
      expect(sliderRef.current.innerSlider.state.currentSlide).toBe(2);
    });
  });
});
