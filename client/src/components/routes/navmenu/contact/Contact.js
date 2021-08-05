import React, { useState } from "react";
import axios from "axios";

import "./Contact.css";

function Contact(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onMessageChange = (event) => {
    setMessage(event.currentTarget.value);
  };

  let body = {
    name: Name,
    email: Email,
    message: Message,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(body);
    axios({
      method: "POST",
      url: "/api/contact",
      data: body,
    }).then((response) => {
      if (response.data.status === "success") {
        alert("Message Sent.");
      } else if (response.data.status === "fail") {
        alert("Message failed to send.");
      }
    });
  };

  return (
    <section className="contact-page">
      <div className="page-header">
        <h2>궁금한게 있으시나요?</h2>
        <hr></hr>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="dropmenu">
          <select>
            <option value="khs">팀장/앱 개발자, 김형식</option>
            <option value="pky">기계 개발자, 박경용</option>
            <option value="jjh">API/웹 개발자, 주정하</option>
            <option value="jyb">API/웹 디자인, 조유빈</option>
          </select>
        </div>

        <div className="inquiries">
          <input
            type="name"
            id="name"
            placeholder="이름"
            required
            value={Name}
            onChange={onNameChange}
          ></input>
          <input
            type="email"
            id="email"
            placeholder="이메일"
            required
            value={Email}
            onChange={onEmailChange}
          ></input>
          <textarea
            id="message"
            placeholder="문의를 적어주세요"
            value={Message}
            onChange={onMessageChange}
          ></textarea>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default Contact;
