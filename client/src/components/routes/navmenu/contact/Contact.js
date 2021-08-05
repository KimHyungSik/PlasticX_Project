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
        <h2>문의하기</h2>
        <hr></hr>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>To. PlasticX</label>
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
            placeholder="문의하실 내용을 적어주세요."
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
