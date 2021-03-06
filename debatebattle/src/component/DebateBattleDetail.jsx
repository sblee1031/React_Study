import { useState, useEffect } from "react";
import { Table, button, Image } from "react-bootstrap";
import "./css/battle.css";
import ApiService from "../ApiService";
import SockJsClient from "react-stomp";

import { Grid, Typography } from "@material-ui/core";
import axios from "axios";

export default function DebateBattleDetail(props) {
  const BACK_URL = "http://59.9.223.1:39999/ta_back";
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

  const [evid_A1, setEvid_A1] = useState("");
  const [evid_A2, setEvid_A2] = useState("");
  const [evid_A3, setEvid_A3] = useState("");
  const [evid_B1, setEvid_B1] = useState("");
  const [evid_B2, setEvid_B2] = useState("");
  const [evid_B3, setEvid_B3] = useState("");

  const [audience, setAudience] = useState([]);
  const [votecnt, setVoteCnt] = useState();
  const [agree, setAgree] = useState(0);
  const [disAgree, setDisAgree] = useState(0);
  const [neutrality, setNeutrality] = useState(0);
  useEffect(() => {
    ApiService.fetchDiscussors(debate.debate_no).then((res) => {
      setdebateDetail(res.data.list);
      setEvid_A1(res.data.list[0].evi_one);
      setEvid_A2(res.data.list[0].evi_two);
      setEvid_A3(res.data.list[0].evi_three);
      setEvid_B1(res.data.list[1].evi_one);
      setEvid_B2(res.data.list[1].evi_two);
      setEvid_B3(res.data.list[1].evi_three);
    });
  }, []);

  useEffect(() => {
    const params = {
      deb_no: debate.debate_no, //
      mem_no: logininfo?.member_no, //
    };
    ApiService.fetchAudOneByTwo(params).then((res) => {
      if (res.data.audience == null) {
        ApiService.addVote(params).then(() => {
          console.log("audience ?????? ??????");
          ApiService.fetchAudOneByTwo(params).then((res) => {
            setAudience(res.data.audience);
          });
        });
      } else {
        setAudience(res.data.audience);
      }
    });
  }, []);

  const sendMessage = () => {
    clientRef.sendMessage(
      `/app/sendMessage/${room}`,
      JSON.stringify({
        name: name,
        message: message,
        votecnt: votecnt,
        server: false,
      })
    );
    setMessage("");
  };

  // ?????? ??????
  const handleChange = (e) => {
    const btn_no = e.target.className;
    if (btn_no == "evidence_A1") {
      setEvid_A1(e.target.value);
    } else if (btn_no == "evidence_A2") {
      setEvid_A2(e.target.value);
    } else if (btn_no == "evidence_A3") {
      setEvid_A3(e.target.value);
    } else if (btn_no == "evidence_B1") {
      setEvid_B1(e.target.value);
    } else if (btn_no == "evidence_B2") {
      setEvid_B2(e.target.value);
    } else if (btn_no == "evidence_B3") {
      setEvid_B3(e.target.value);
    }
  };

  const btn_a1 = (e) => {
    if (debateDetail[0].discussor.member_nickName == name) {
      const params = {
        detail_no: debateDetail[0].detail_no,
        word: "evidence",
        evi_no: 1,
        setdata: evid_A1,
      };

      ApiService.editDetail(params);
      alert("????????? ?????????????????????.");
    } else {
      alert("????????? A??? ????????? ???????????????.");
    }
    updateEvi(e);
  };

  const btn_a2 = (e) => {
    if (debateDetail[0].discussor.member_nickName == name) {
      const params = {
        detail_no: debateDetail[0].detail_no,
        word: "evidence",
        evi_no: 2,
        setdata: evid_A2,
      };

      ApiService.editDetail(params);
      updateEvi(e);
      alert("????????? ?????????????????????.");
    } else {
      alert("????????? A??? ????????? ???????????????.");
    }
  };

  const btn_a3 = (e) => {
    if (debateDetail[0].discussor.member_nickName == name) {
      const params = {
        detail_no: debateDetail[0].detail_no,
        word: "evidence",
        evi_no: 3,
        setdata: evid_A3,
      };

      ApiService.editDetail(params);
      updateEvi(e);
      alert("????????? ?????????????????????.");
    } else {
      alert("????????? A??? ????????? ???????????????.");
    }
  };

  const btn_b1 = (e) => {
    if (debateDetail[1].discussor.member_nickName == name) {
      const params = {
        detail_no: debateDetail[1].detail_no,
        word: "evidence",
        evi_no: 1,
        setdata: evid_B1,
      };

      ApiService.editDetail(params);
      updateEvi(e);
      alert("????????? ?????????????????????.");
    } else {
      alert("????????? B??? ????????? ???????????????.");
    }
  };

  const btn_b2 = (e) => {
    if (debateDetail[1].discussor.member_nickName == name) {
      const params = {
        detail_no: debateDetail[1].detail_no,
        word: "evidence",
        evi_no: 2,
        setdata: evid_B2,
      };

      ApiService.editDetail(params);
      updateEvi(e);
      alert("????????? ?????????????????????.");
    } else {
      alert("????????? B??? ????????? ???????????????.");
    }
  };

  const btn_b3 = (e) => {
    if (debateDetail[1].discussor.member_nickName == name) {
      const params = {
        detail_no: debateDetail[1].detail_no,
        word: "evidence",
        evi_no: 3,
        setdata: evid_B3,
      };

      ApiService.editDetail(params);
      updateEvi(e);
      alert("????????? ?????????????????????.");
    } else {
      alert("????????? B??? ????????? ???????????????.");
    }
  };

  // ?????? Update
  const setVote = (e) => {
    console.log(e.target.value);
    setMessage("");
    const params = {
      audi_no: audience.audi_no,
      vote_no: e.target.value, //
    };
    console.log(params);
    ApiService.editVote(params).then((res) => {
      console.log("?????? ?????? ??????");
      // clientRef.sendMessage(
      //   `/app/sendMessage/${room}`,
      //   JSON.stringify({
      //     message: null,
      //     votecnt: votecnt,
      //   })
      // );
      updateEvi(e);
      alert("?????????????????????.");
    });
  };

  const updateEvi = (e) => {
    setTimeout(() => {
      clientRef.sendMessage(
        `/app/sendMessage/${room}`,
        JSON.stringify({
          name: null,
          message: null,
        })
      );
    }, 1000);
  };

  // console.log("Audience : ", audience);

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
                      alt={"?????????"}
                      roundedCircle
                    />
                    <br></br>
                    ????????? A :{" "}
                    {debateDetail
                      ? debateDetail[0].discussor.member_nickName
                      : ""}
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="table-light">
              <tr>
                <td>?????? 1</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      btn_a1();
                    }}
                  >
                    ??????
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A" colSpan="2">
                  <textarea
                    className="evidence_A1"
                    value={evid_A1}
                    type="text"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>?????? 2</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      btn_a2();
                    }}
                  >
                    ??????
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A" colSpan="2">
                  <textarea
                    className="evidence_A2"
                    value={evid_A2}
                    type="text"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>?????? 3</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      btn_a3();
                    }}
                  >
                    ??????
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_A" colSpan="2">
                  <textarea
                    className="evidence_A3"
                    value={evid_A3}
                    type="text"
                    onChange={handleChange}
                  />
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
                    {debate.debate_time}???
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="battle_vote">
                    {/* <div>{messages}</div> */}
                    {debateDetail ? debateDetail[0].discuss : ""} {agree} ??? /
                    ?????? {neutrality} ??? /{" "}
                    {debateDetail ? debateDetail[1].discuss : ""} {disAgree}???
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div style={{ marginBottom: "5px" }}>????????? ??????</div>
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
                        return debateDetail &&
                          e.name ==
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
                  <div className="set_time-group">
                    <button id="start" className="btn btn-primary btn_settime">
                      ??????
                    </button>
                    <button id="end" className="btn btn-secondary btn_settime">
                      ??????
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div>????????? ??????</div>
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
                        );
                      })}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="vote_div_group">
                    <button
                      className="btn btn-info btn_vote"
                      value="1"
                      onClick={(e) => {
                        setVote(e);
                      }}
                    >
                      {debateDetail ? debateDetail[0].discuss : ""}
                    </button>
                    <button
                      className="btn btn-success btn_vote"
                      value="2"
                      onClick={(e) => {
                        setVote(e);
                      }}
                    >
                      ??????
                    </button>
                    <button
                      className="btn btn-danger btn_vote"
                      value="3"
                      onClick={(e) => {
                        setVote(e);
                      }}
                    >
                      {debateDetail ? debateDetail[1].discuss : ""}
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
                    ??????
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
                      alt={"?????????"}
                      roundedCircle
                    />
                    <br></br>
                    ????????? A :{" "}
                    {debateDetail
                      ? debateDetail[1].discussor.member_nickName
                      : ""}
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="table-light">
              <tr>
                <td>?????? 1</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      btn_b1();
                    }}
                  >
                    ??????
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_B" colSpan="2">
                  <textarea
                    className="evidence_B1"
                    value={evid_B1}
                    type="text"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>?????? 2</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      btn_b2();
                    }}
                  >
                    ??????
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_B" colSpan="2">
                  <textarea
                    className="evidence_B2"
                    value={evid_B2}
                    type="text"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>?????? 3</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      btn_b3();
                    }}
                  >
                    ??????
                  </button>
                </td>
              </tr>
              <tr>
                <td className="evidence_B" colSpan="2">
                  <textarea
                    className="evidence_B3"
                    value={evid_B3}
                    type="text"
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <SockJsClient
        url="http://59.9.223.1:39999/ta_back/websocket-chat/"
        topics={topics}
        onConnect={() => {
          console.log("connected");
          clientRef.sendMessage(
            `/app/addUser/${room}`,
            JSON.stringify({
              name: name,
              message: name + " has connected!",
              votecnt: votecnt,
              server: true,
            })
          );
        }}
        onDisconnect={() => {
          console.log("disconnected");
        }}
        onMessage={(e) => {
          console.log("e", e);
          //?????? ??????
          if (e.votecnt) {
            setAgree(e.votecnt.agree);
            setNeutrality(e.votecnt.neutrality);
            setDisAgree(e.votecnt.disagree);
            // setEvid_A1(e.ddList[0].evi_one);
            // setEvid_A2(e.ddList[0].evi_two);
            // setEvid_A3(e.ddList[0].evi_three);
            // setEvid_B1(e.ddList[1].evi_one);
            // setEvid_B2(e.ddList[1].evi_two);
            // setEvid_B3(e.ddList[1].evi_three);
          }
          //?????? ????????????
          if (e.name == null) {
            console.log("name null");
            console.log("e ddlist:", e.ddList);
            setEvid_A1(e.ddList[0].evi_one);
            setEvid_A2(e.ddList[0].evi_two);
            setEvid_A3(e.ddList[0].evi_three);
            setEvid_B1(e.ddList[1].evi_one);
            setEvid_B2(e.ddList[1].evi_two);
            setEvid_B3(e.ddList[1].evi_three);
          } // ???????????? ??????
          else if (
            e.name == debateDetail[0].discussor.member_nickName ||
            e.name == debateDetail[1].discussor.member_nickName
          ) {
            const temp = [...messages];
            temp.push(e);
            setMessages(temp);
          }
          // ????????? ??????
          else {
            const temp = [...messages2];
            temp.push(e);
            setMessages2(temp);
          }
        }}
        ref={(client) => {
          console.log("client", client);
          setClientRef(client);
        }}
      />
    </>
  );
}
