import { useState, useEffect } from "react";
import { Table, button, Image } from "react-bootstrap";
import "./css/battle.css";
import ApiService from "../ApiService";
import SockJsClient from "react-stomp";

import { Grid, Typography } from "@material-ui/core";

export default function DebateBattleDetail(props) {
  const [debate] = useState(props?.location?.state.debate);
  const [logininfo] = useState(props?.location?.state.logininfo);
  const [debateDetail, setdebateDetail] = useState();

  const [name] = useState(logininfo?.member_nickName);
  const [room] = useState(debate.debate_no);
  const [topics] = useState([`/topic/${room}`]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const [clientRef, setClientRef] = useState();

  useEffect(() => {
    console.log("useEffect 가동");
    ApiService.fetchDiscussors(debate.debate_no).then((res) => {
      console.log("res : ", res);
      setdebateDetail(res.data.list);
    });
  }, []);

  const sendMessage = () => {
    clientRef.sendMessage(
      `/app/sendMessage/${room}`,
      JSON.stringify({
        name: name,
        message: message,
        server: false,
      })
    );
    setMessage("");
  };

  // 근거 버튼 등록
  const btn_A1 = (e) => {
    if (debateDetail[0].discussor.member_nickName == name) {
      const params = {
        detail_no: debateDetail[0].detail_no,
        word: "evidence",
        evi_no: 1,
        setdata: "",
      };
      ApiService.editDetail(params);
    } else {
      alert("토론자 A만 수정 가능");
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="discussor1">
          <Table hover>
            <thead className="table-info">
              <tr>
                <td colSpan="2">
                  <div>
                    <Image
                      src={
                        debateDetail
                          ? debateDetail[0].discussor.member_thumb
                          : ""
                      }
                      style={{ height: "120px", marginLeft: "20px" }}
                      alt={"썸네일"}
                      roundedCircle
                    />
                    <br></br>
                    토론자 A :{" "}
                    {debateDetail
                      ? debateDetail[0].discussor.member_nickName
                      : ""}
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="table-light">
              <tr>
                <td>근거 1</td>
                <td>
                  <button className="btn btn-info">등록</button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A" colSpan="2">
                  <textarea className="evidence_A1" type="text" />
                </td>
              </tr>
              <tr>
                <td>근거 2</td>
                <td>
                  <button className="btn btn-info btn_evid" value="A2">
                    등록
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A2" colSpan="2">
                  <textarea className="evidence_A2" type="text" />
                </td>
              </tr>
              <tr>
                <td>근거 3</td>
                <td>
                  <button className="btn btn-info btn_evid" value="A3">
                    등록
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A3" colSpan="2">
                  <textarea className="evidence_A3" type="text" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="chatting">
          <Table hover>
            <thead className="table-success">
              <tr>
                <td colSpan="3">
                  <div id="" className="battle_topic">
                    {debate.debate_topic}
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="table-light">
              <tr>
                <td colSpan="3">
                  <div id="" className="battle-timer">
                    {debate.debate_time}분
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="battle_vote">
                    {debateDetail ? debateDetail[0].discuss : ""}XX% / 중립 XX%
                    / {debateDetail ? debateDetail[1].discuss : ""} XX%
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div style={{ marginBottom: "5px" }}>토론자 채팅</div>
                  <div
                    id="discussorWindow"
                    style={{
                      height: "145px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <div style={{}}>
                      {messages.map((e, i) => {
                        return e.name ==
                          debateDetail[0]?.discussor.member_nickName ? (
                          <div className="discussor1message" key={i}>
                            {e.server ? (
                              <Grid
                                item
                                style={{
                                  padding: "10px",
                                  fontStyle: "italic",
                                  textAlign: "center",
                                }}
                                key={i}
                              >
                                <Typography style={{ fontWeight: "800" }}>
                                  {e.message}
                                </Typography>
                              </Grid>
                            ) : (
                              <Grid
                                item
                                style={{
                                  padding: "10px",
                                  wordWrap: "break-word",
                                }}
                                key={i}
                              >
                                <Typography>
                                  {e.name}
                                  <br />
                                  {e.message}
                                </Typography>
                              </Grid>
                            )}
                          </div>
                        ) : (
                          <div className="discussor2message" key={i}>
                            {e.server ? (
                              <Grid
                                item
                                style={{
                                  padding: "10px",
                                  fontStyle: "italic",
                                  textAlign: "center",
                                }}
                                key={i}
                              >
                                <Typography style={{ fontWeight: "800" }}>
                                  {e.message}
                                </Typography>
                              </Grid>
                            ) : (
                              <Grid
                                item
                                style={{
                                  padding: "10px",
                                  wordWrap: "break-word",
                                }}
                                key={i}
                              >
                                <Typography>
                                  {e.name}
                                  <br /> {e.message}
                                </Typography>
                              </Grid>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="set_time-group">
                    <button id="start" className="btn btn-primary btn_settime">
                      시작
                    </button>
                    <button id="end" className="btn btn-secondary btn_settime">
                      종료
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div>중계방 채팅</div>
                  <div
                    id="audienceWindow"
                    style={{
                      height: "140px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      {messages2.map((e, i) => {
                        return (
                          <div key={i}>
                            {e.server ? (
                              <Grid
                                item
                                style={{
                                  padding: "10px",
                                  fontStyle: "italic",
                                }}
                                key={i}
                              >
                                <Typography
                                  style={{
                                    fontWeight: "800",
                                    textAlign: "center",
                                  }}
                                >
                                  {e.message}
                                </Typography>
                              </Grid>
                            ) : (
                              <Grid item style={{ padding: "10px" }} key={i}>
                                <Typography style={{ wordWrap: "break-word" }}>
                                  {e.name}
                                  <br />
                                  {e.message}
                                </Typography>
                              </Grid>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="vote_div_group">
                    <button className="btn btn-info btn_vote" value="1">
                      찬성
                    </button>
                    <button className="btn btn-success btn_vote" value="2">
                      중립
                    </button>
                    <button className="btn btn-danger btn_vote" value="3">
                      반대
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    id="user"
                    type="text"
                    value={logininfo?.member_nickName}
                    style={{
                      width: "70px",
                      border: "none",
                      fontSize: "10pt",
                      fontStyle: "italic",
                      fontWeight: "800",
                      color: "darkslategrey",
                    }}
                    readOnly="readonly"
                  />
                </td>
                <td>
                  <input
                    id="textMessage"
                    type="text"
                    style={{ width: "100%" }}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      console.log(e.key);
                      if (e.key == "Enter") {
                        sendMessage();
                      }
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    전송
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="discussor2">
          <Table hover>
            <thead className="table-secondary">
              <tr>
                <td colSpan="2">
                  <div>
                    <Image
                      src={
                        debateDetail
                          ? debateDetail[1].discussor.member_thumb
                          : ""
                      }
                      style={{ height: "120px", marginLeft: "20px" }}
                      alt={"썸네일"}
                      roundedCircle
                    />
                    <br></br>
                    토론자 B :{" "}
                    {debateDetail
                      ? debateDetail[1].discussor.member_nickName
                      : ""}
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="table-light">
              <tr>
                <td>근거 1</td>
                <td>
                  <button className="btn btn-secondary">등록</button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A" colSpan="2">
                  <textarea className="evidence_A1" type="text" />
                </td>
              </tr>
              <tr>
                <td>근거 2</td>
                <td>
                  <button className="btn btn-secondary btn_evid" value="A2">
                    등록
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A2" colSpan="2">
                  <textarea className="evidence_A2" type="text" />
                </td>
              </tr>
              <tr>
                <td>근거 3</td>
                <td>
                  <button className="btn btn-secondary btn_evid" value="A3">
                    등록
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A3" colSpan="2">
                  <textarea className="evidence_A3" type="text" />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <SockJsClient
        url="http://localhost:9999/ta_back/websocket-chat/"
        topics={topics}
        onConnect={() => {
          console.log("connected");
          clientRef.sendMessage(
            `/app/addUser/${room}`,
            JSON.stringify({
              name: name,
              message: name + " has connected!",
              server: true,
            })
          );
        }}
        onDisconnect={() => {
          console.log("disconnected");
        }}
        onMessage={(e) => {
          // console.log(e)
          // 토론자일 경우
          if (
            name == debateDetail[0].discussor.member_nickName ||
            name == debateDetail[1].discussor.member_nickName
          ) {
            const temp = [...messages];
            temp.push(e);
            setMessages(temp);
          }
          // 관중일 경우
          else {
            const temp = [...messages2];
            temp.push(e);
            setMessages2(temp);
          }
        }}
        ref={(client) => {
          setClientRef(client);
        }}
      />
    </>
  );
}
