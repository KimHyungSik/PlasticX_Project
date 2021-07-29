import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./HomePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <section className="home global-width">
          <div className="article article-1">
            <h1>
              <span>Stop</span> using Plastic
            </h1>
            <h4>일회용 플라스틱 컵 대신 텀블러를 사용해보세요.</h4>
            <h5 className="manual">
              <Link to="/manual">
                <button>사용법</button>
              </Link>
            </h5>
          </div>
          <div>
            <img className="tumbler-img" alt="tumbler" src="img/tumbler.jpg" />
          </div>
        </section>

        <section className="home global-width">
          <div>
            <img className="earth-img" alt="earth" src="img/earth.jpg" />
          </div>
          <div className="article article-2">
            <h1>
              <span>Earth</span> is not disposable
            </h1>
            <h4>
              버려지는 일회용 컵 하루 7000만 개 <br></br> 줄이고 재활용하면
              지구를 지킬 수 있어요
            </h4>
            <h5 className="more">
              <a
                href="https://www.mbn.co.kr/news/economy/4409215"
                target="_blank"
              >
                <button>더보기</button>
              </a>
            </h5>
          </div>
        </section>
      </>
    );
  }
}

// function HomePage() {
//    useEffect(() => {
//      axios.get("/api/hello").then((response) => console.log(response.data));
//   }, []);
// }

export default HomePage;
