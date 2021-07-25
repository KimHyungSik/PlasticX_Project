import React from "react";

import "./Manual.css";
import ManualImgItems from "./ManualItems";
import ManualTextItems from "./ManualItems";

class Manual extends React.Component {
  componentDidMount() {
    const stepElems = document.querySelectorAll(".step");
    const graphicElems = document.querySelectorAll(".graphic-item");
    let currentItem = graphicElems[0]; // 현재 활성화된 visible
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
      ioIndex = entries[0].target.dataset.index * 1;
    });

    for (let i = 0; i < stepElems.length; i++) {
      io.observe(stepElems[i]);
      stepElems[i].dataset.index = i;
      graphicElems[i].dataset.index = i;
    }

    const activate = () => {
      currentItem.classList.add("visible");
    };
    const inactivate = () => {
      currentItem.classList.remove("visible");
    };

    window.addEventListener("scroll", () => {
      let step;
      let boundingRect;

      for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
        step = stepElems[i];

        if (!step) continue;
        boundingRect = step.getBoundingClientRect();

        if (
          boundingRect.top > window.innerHeight * 0.1 &&
          boundingRect.top < window.innerHeight * 0.8
        ) {
          inactivate();
          currentItem = graphicElems[step.dataset.index];
          activate();
        }
      }
    });
    activate();
  }

  render() {
    console.log("hello");
    return (
      <>
        <section className="global-width">
          <h1 className="manual-title">
            <span>PLASTICX </span>이렇게 사용하세요!
          </h1>
        </section>
        <section className="scroll-contenxt global-width">
          <div className="scroll-graphic">
            {ManualImgItems.ManualImgItems.map((item, index) => {
              return (
                <div className={item.cName} key={index}>
                  <img className={item.imgcName} src={item.src} alt="" />
                </div>
              );
            })}
          </div>
          <div className="scroll-text">
            {ManualTextItems.ManualTextItems.map((item, index) => {
              return (
                <div className={item.textClassName} key={index}>
                  <p>{item.manualContent}</p>
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default Manual;
