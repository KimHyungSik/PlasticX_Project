import React from "react";
import axios from "axios";

import HistoryTumbler from "./HistoryTumbler";
import "./History.css";

class History extends React.Component {
  state = {
    tumblersInfo: [],
    isLoading: true,
  };

  getHistory = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const tumblersInfo = await axios.get(`/api/user/history/${_id}`);
    this.setState({
      tumblersInfo: tumblersInfo.data.tumblers,
      isLoading: false,
    });

    console.log(tumblersInfo.data.tumblers);
  };

  componentDidMount() {
    this.getHistory();
  }

  render() {
    const { tumblersInfo, isLoading } = this.state;
    return (
      <section className="mypage-content">
        {isLoading ? (
          <div className="loader">
            <div className="loading_container">
              <div className="loading"></div>
              <div className="loader_text">Loading...</div>
            </div>
          </div>
        ) : (
          <>
            <span className="mypage-content-title">이용 내역</span>
            {tumblersInfo.map((tumbler) => {
              return (
                <div className="mypage-history-content">
                  <div>
                    <img
                      className="tumbler-example"
                      src="../img/tumbler_example.jpg"
                    />
                  </div>
                  <ul>
                    <li>
                      <label>Name</label>
                      <HistoryTumbler model={tumbler.model} />
                    </li>
                    <li>
                      <label>Cafe</label>
                      <HistoryTumbler shop={tumbler.shop} />
                    </li>
                    <li>
                      <label>Rental Period</label>
                      <HistoryTumbler borrowed_date={tumbler.borrowed_date} />
                      <HistoryTumbler
                        usable_period_date={tumbler.usable_period_date}
                      />
                    </li>
                  </ul>
                </div>
              );
            })}
          </>
        )}
      </section>
    );
  }
}

export default History;
