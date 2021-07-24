import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import FAQListItems from "./FAQListItems";
import "./FAQ.css";

function FAQ() {
  let [showFirstFaqOpen, setFistOpen] = useState(false);
  let [showSecondFaqOpen, setSecondOpen] = useState(false);
  let [showThirdFaqOpen, setThirdOpen] = useState(false);

  return (
    <section>
      <div className="faq-title">
        <h1>
          자주 묻는 <span>질문</span>
        </h1>
      </div>
      <ul className="faq-list">
        <li
          className={FAQListItems[0].questionClassName}
          onClick={() => setFistOpen(!showFirstFaqOpen)}
          aria-expanded={showFirstFaqOpen}
        >
          {FAQListItems[0].title}
          <i className="far fa-plus-circle"></i>
        </li>
        <Collapse in={showFirstFaqOpen}>
          <div className={FAQListItems[0].answerClassName}>
            {FAQListItems[0].answer}
          </div>
        </Collapse>

        <li
          className={FAQListItems[1].questionClassName}
          onClick={() => setSecondOpen(!showSecondFaqOpen)}
          aria-expanded={showSecondFaqOpen}
        >
          {FAQListItems[1].title}
          <i className="far fa-plus-circle"></i>
        </li>
        <Collapse in={showSecondFaqOpen}>
          <div className={FAQListItems[1].answerClassName}>
            {FAQListItems[1].answer}
          </div>
        </Collapse>

        <li
          className={FAQListItems[2].questionClassName}
          onClick={() => setThirdOpen(!showThirdFaqOpen)}
          aria-expanded={showThirdFaqOpen}
        >
          {FAQListItems[2].title}
          <i className="far fa-plus-circle"></i>
        </li>
        <Collapse in={showThirdFaqOpen}>
          <div className={FAQListItems[2].answerClassName}>
            {FAQListItems[2].answer}
          </div>
        </Collapse>
      </ul>
    </section>
  );
}

export default FAQ;
