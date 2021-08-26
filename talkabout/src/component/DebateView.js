import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
// import debWri

export default function DebateView() {
  // const [list, setList] = useState({});
  // const [ckeditor, setCkeditor] = useState({}); //ckeditor 객체
  // const [comp, setComp] = useState(DebWrite);
  const [debate, setDebate] = useState();
  const [detail, setDetail] = useState();
  const [discuss1, setDiscuss1] = useState(false);
  const [discuss2, setDiscuss2] = useState(false);
  const [content, setContent] = useState("");
  const [writeDate, setWriteDate] = useState("");
  const [debDate, setDebDate] = useState("");
  const [debTime, setDebTime] = useState("");
  const [debWriter, setDebWriter] = useState("");
  const [thumnail, setThumnail] = useState("");
  const { no } = useParams();
  const [discussor1, setDiscussor1] = useState();
  const [discussor2, setDiscussor2] = useState();
  const [inButton1, setInButton1] = useState(false);
  const [outButton1, setOutButton1] = useState(false);
  const [inButton2, setInButton2] = useState(false);
  const [outButton2, setOutButton2] = useState(false);
  const [modifyButton, setModifyButton] = useState(false);
  const [deleteButton, setdeleteButton] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});

  const url = `http://localhost:9999/ta_back/debrecruit/${no}`;
  //console.log("url : ", url);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log("뷰-->", response);
          //setList(response);
          setDebate(response.debate.debate);
          setDetail(response.debate.detail);
          setThumnail(response.debate.debate.debate_writer.member_thumb);
          setDebDate(response.debate.debate.debate_startDate);
          setDebWriter(response.debate.debate.debate_writer.member_nickName);
          setDebTime(response.debate.debate.debate_time);
          setWriteDate(response.debate.debate.debate_date);
          setDiscuss1(response.debate.detail[0].discuss);
          setDiscuss2(response.debate.detail[1].discuss);
          setContent(response.debate.debate.debate_content);
          setLoginInfo(response.logininfo);
          setDiscussor1(response.debate.detail[0]?.discussor);
          setDiscussor2(response.debate.detail[1]?.discussor);
          setLoading(false);
        });
    };

    if (loginInfo && debate && detail) {
      //console.log("==>", loginInfo);
      // console.log(
      //   "**dis1=>",
      //   discussor1,
      //   "dis2=>",
      //   discussor2,
      //   "logininfo=>",
      //   loginInfo,
      //   "debate",
      //   debate,
      //   "detail",
      //   detail
      // );
      if (debate?.debate_status !== "모집중") {
        // console.log("모집중 아님", debate?.debate_status);
        setModifyButton(false);
        setdeleteButton(false);
        setOutButton1(false);
        setOutButton1(false);
        setInButton1(false);
        setInButton1(false);
      } else {
        // console.log("모집중");
        if (
          //수정 삭제 버튼 시작
          loginInfo !== "non-member" &&
          debWriter === loginInfo?.member_nickName
        ) {
          setModifyButton(true);
          setdeleteButton(true);
        } else {
          setModifyButton(false);
          setdeleteButton(false);
        } //수정 삭제 버튼 끝
        //
        //참여버튼 시작
        if (
          detail[1].discussor?.member_no !== loginInfo?.member_no &&
          detail[0].discussor === null
        ) {
          // console.log("discussor1", discussor1);
          setInButton1(true);
          // setInButton2(true);
          if (
            loginInfo !== "non-member" &&
            detail[1].discussor?.member_no !== loginInfo?.member_no
          ) {
            // console.log(
            //   "discussor2?.member_no != loginInfo?.member_no",
            //   discussor2?.member_no
            // );
            setInButton1(true);
          }
        } else if (
          loginInfo !== "non-member" &&
          detail[0].discussor?.member_no === loginInfo?.member_no
        ) {
          // console.log(
          //   "discussor1?.member_no == loginInfo?.member_no",
          //   discussor1
          // );
          setOutButton1(true);
          setInButton1(false);
          setInButton2(false);
        } else {
          // console.log(
          //   "else discussor1",
          //   "**dis1=>",
          //   discussor1,
          //   "dis2=>",
          //   discussor2,
          //   "logininfo=>",
          //   loginInfo,
          //   "debate",
          //   debate,
          //   "detail",
          //   detail
          // );
          setInButton1(false);
        }
        if (
          (detail[0].discussor?.member_no !== loginInfo?.member_no &&
            detail[1].discussor) === null
        ) {
          // console.log("discussor2", discussor2);
          // setInButton1(true);
          setInButton2(true);
          if (
            loginInfo !== "non-member" &&
            detail[0].discussor?.member_no !== loginInfo?.member_no
          ) {
            // console.log(
            //   "discussor1?.member_no != loginInfo?.member_no",
            //   discussor1
            // );
            setInButton2(true);
          }
        } else if (
          loginInfo !== "non-member" &&
          detail[1].discussor?.member_no === loginInfo?.member_no
        ) {
          // console.log(
          //   "discussor2?.member_no == loginInfo?.member_no",
          //   discussor1
          // );
          setOutButton2(true);
          setInButton1(false);
          setInButton2(false);
        } else {
          // console.log(
          //   "else discussor2",
          //   "**dis1=>",
          //   discussor1,
          //   "dis2=>",
          //   discussor2,
          //   "logininfo=>",
          //   loginInfo,
          //   "debate",
          //   debate,
          //   "detail",
          //   detail
          // );
          setInButton2(false);
        }
        // console.log(
        //   "END dis1=>",
        //   discussor1,
        //   "dis2=>",
        //   discussor2,
        //   "logininfo=>",
        //   loginInfo
        // );
      }
    } else {
      // console.log("else logininfo", loginInfo);
    }
    fetchData();
  }, [loginInfo?.member_no]);

  const debDelete = () => {
    // console.log("삭제");
    const url = "http://localhost:9999/ta_back/debrecruit/delete";
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ debNo: `${no}` }),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status == 1) {
          alert("삭제완료");
          history.push("/ta_front/debrecruit.html");
        } else {
          alert("삭제실패", response.error);
        }
      });
  };
  function discussFetch(method, dd_no, member_no) {
    const url = "http://localhost:9999/ta_back/debrecruit/";
    fetch(url + method, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dd_no: dd_no, member_no: member_no }),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status == 1) {
          alert("수정완료");
          history.push("/ta_front/debrecruit.html");
        } else {
          alert("수정실패", response.error);
        }
      });
  }
  const discuss1Button = (e) => {
    // console.log("discuss1Button", e);
    discussFetch("discussor", detail[0].detail_no, loginInfo.member_no);
  };
  const discuss2Button = (e) => {
    // console.log("discuss2Button", e);
    discussFetch("discussor", detail[1].detail_no, loginInfo.member_no);
  };
  const disCancle1Button = (e) => {
    discussFetch("canclediscussor", detail[0].detail_no, loginInfo.member_no);
  };
  const disCancle2Button = (e) => {
    discussFetch("canclediscussor", detail[1].detail_no, loginInfo.member_no);
  };

  function login() {
    // console.log(history);
    const social = "37612893746";
    fetch("http://localhost:9999/ta_back/member/login?socialNo=" + social, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_social_no: "1775421132",
      }),
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoginInfo(data.member);
        // console.log("로그인--->", data);
        // console.log("로그인완료", loginInfo);
      });
  }

  return (
    <>
      {/* 로그인 번호 : {loginInfo?.member_no} / {loginInfo?.member_nickName} */}
      {loading ? <div>Loading...</div> : ""}
      {/* <button onClick={login}>로긴1</button> */}
      {/* <button onClick={logo}>버튼</button> */}
      <div className="writeView" style={{ marginTop: "50px" }}>
        <div
          className="divDiscuss"
          style={{
            width: "100%",
            display: "inline",
            textAlign: "center",
          }}
        >
          <div
            className="writeInfo"
            style={{
              display: "inline-block",
              width: "20%",
              textAlign: "left",
              fontWeight: "800",
            }}
          >
            <label>작성자: {debWriter}</label>
            <Image
              src={thumnail}
              style={{ height: "50px", marginLeft: "20px" }}
              alt={"썸네일"}
              roundedCircle
            />

            <label>작성시간 : {writeDate}</label>
          </div>
          <label className="labelDiscuss" style={{ width: "20%" }}>
            주장 1 <br />
            <input
              className="inputDiscuss1"
              name="discuss1"
              value={discuss1}
              style={{ textAlign: "center", width: "100%" }}
              readOnly
            ></input>
            {discussor1?.member_nickName ? (
              <p style={{ marginTop: "10px", fontSize: "17pt" }}>
                토론자 : {discussor1?.member_nickName}
                <Image
                  src={discussor1?.member_thumb}
                  style={{ height: "30px", marginLeft: "10px" }}
                  alt={"썸네일"}
                  roundedCircle
                />
              </p>
            ) : (
              <p style={{ fontSize: "15pt", margin: "5px", color: "red" }}>
                참여가능
              </p>
            )}
            {outButton1 && (
              <Button variant="warning" onClick={disCancle1Button}>
                참여취소
              </Button>
            )}
            {inButton1 && (
              <Button variant="outline-success" onClick={discuss1Button}>
                토론자1 참여
              </Button>
            )}
          </label>
          <label className="vs" style={{ textAlign: "center", width: "10%" }}>
            {" "}
            VS{" "}
          </label>
          <label className="labelDiscuss" style={{ width: "20%" }}>
            주장 2 <br />
            <input
              className="inputDiscuss2"
              name="discuss2"
              value={discuss2}
              style={{ textAlign: "center", width: "100%" }}
              readOnly
            ></input>
            {discussor2?.member_nickName ? (
              <p style={{ marginTop: "10px", fontSize: "17pt" }}>
                토론자 : {discussor2?.member_nickName}
                <Image
                  src={discussor2?.member_thumb}
                  style={{ height: "30px", marginLeft: "10px" }}
                  alt={"썸네일"}
                  roundedCircle
                />
              </p>
            ) : (
              <p style={{ fontSize: "15pt", margin: "5px", color: "red" }}>
                참여 가능
              </p>
            )}
            {outButton2 && (
              <Button variant="warning" onClick={disCancle2Button}>
                참여취소
              </Button>
            )}
            {inButton2 && (
              <Button variant="outline-success" onClick={discuss2Button}>
                토론자2 참여
              </Button>
            )}
          </label>
          <div
            className="debInfo"
            style={{
              display: "inline-block",
              width: "25%",
              margin: "0px 10px",
            }}
          >
            <label style={{ marginBottom: "10px", fontWeight: "600" }}>
              토론일자 :
              <input
                className="debDate"
                value={debDate}
                style={{ textAlign: "center", marginLeft: "10px" }}
                readOnly
              ></input>
            </label>
            <label style={{ marginBottom: "10px", fontWeight: "600" }}>
              토론시간 :
              <input
                className="debTime"
                value={debTime}
                style={{ textAlign: "center", marginLeft: "10px" }}
                readOnly
              ></input>
            </label>
          </div>
        </div>
        <div className="divEditor" style={{ overflow: "auto" }}>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            config={{
              toolbar: [],
            }}
            onReady={(editor) => {
              editor.isReadOnly = true;

              //setCkeditor(editor);
              //editor.isReadOnly = { readOnly };
              // You can store the "editor" and use when it is needed.
              //console.log("Editor is ready to use!", editor);
            }}
            // onChange={changeEditor}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
        </div>

        <div className="divWriteButton" style={{ textAlign: "right" }}>
          {modifyButton && (
            <Link
              to={{
                pathname: `/ta_front/debrecruit/modify`,
                state: { debate: debate, detail: detail },
              }}
            >
              <Button
                className="buttonWrite"
                variant="outline-success"
                size="sm"
                style={{ margin: "10px" }}
                // onClick={debModify}
              >
                수정하기
              </Button>
            </Link>
          )}

          {deleteButton && (
            <Button
              className="buttonWrite"
              variant="outline-success"
              size="sm"
              style={{ margin: "10px" }}
              onClick={debDelete}
            >
              삭제하기
            </Button>
          )}
          <Link to="/ta_front/debrecruit.html">
            <Button
              className="buttonBack"
              variant="outline-success"
              size="sm"
              style={{ margin: "10px" }}
            >
              돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
