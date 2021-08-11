import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Aos from "aos";

import "./HomePage.css";

Aos.init();

class HomePage extends React.Component {
  render() {
    return (
      <>
        <section className="home global-width">
          <div className="article article-1">
            <h1>
              <span>Stop</span> using Plastic
            </h1>
            <h4>
              일회용 플라스틱 컵 대신 <span>텀블러</span>를 사용해보세요.
            </h4>
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
              버려지는 일회용 컵 하루 7000만 개 <br></br> 줄이고 재활용하면{" "}
              <span>지구</span>를 지킬 수 있어요.
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

        <section className="home global-width">
          <div className="article article-3">
            <div data-aos="zoom-in" data-aos-duration="1500">
              <h1>
                Meet <span>PLASTICX</span> at a nearby cafe right now.
              </h1>
              <h2>
                지금 바로 가까운 카페에서 <span>PLASTICX</span>를 만나보세요.
              </h2>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default HomePage;
