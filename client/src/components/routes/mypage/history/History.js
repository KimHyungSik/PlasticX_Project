import React from "react";
import axios from "axios";

import HistoryTumbler from "./HistoryTumbler";
import "./History.css";

class History extends React.Component {
  state = {
    returnedDate: [],
    isLoading: true,
  };

  getHistory = async () => {
    const {
      data: { _id },
    } = await axios.get("/api/user/auth");

    const tumblersInfo = await axios.get(`/api/user/history/${_id}`);

    this.setState({
      returnedDate: tumblersInfo.data.tumblers_returned,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getHistory();
  }

  render() {
    const { returnedDate, isLoading } = this.state;
    console.log(returnedDate);
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
            {returnedDate.length === 0 ? (
              <div className="mypage-tumbler-content no-list">
                <span>텀블러 이용 내역이 없습니다.</span>
              </div>
            ) : (
              <>
                {returnedDate.map((tumbler) => {
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
                          <label>Returned Date</label>
                          <HistoryTumbler
                            returned_date={tumbler.returned_date}
                          />
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </section>
    );
  }
}

export default History;
