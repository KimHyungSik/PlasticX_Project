import React, { useEffect } from "react";
import axios from "axios";

export default function auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    useEffect(() => {
      axios.get("/api/user/auth").then((response) => {
        if (response.data.RESULT == 400) {
          if (option) {
            alert("로그인을 먼저 하세요.");
            props.history.push("/login");
          }
        } else {
          if (option === false) {
            //alert("이미 로그인 되어있습니다.");
            props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
