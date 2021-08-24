import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export default function DebateView() {
  // const [list, setList] = useState({});
  const [ckeditor, setCkeditor] = useState({}); //ckeditor 객체
  const [discuss1, setDiscuss1] = useState(false);
  const [discuss2, setDiscuss2] = useState(false);
  const [content, setContent] = useState("");
  const [writeDate, setWriteDate] = useState("");
  const [debDate, setDebDate] = useState("");
  const [debTime, setDebTime] = useState("");
  const [debWriter, setDebWriter] = useState("");
  const [thumnail, setThumnail] = useState("");
  const { no } = useParams();
  const [discussor1, setDiscussor1] = useState(false);
  const [discussor2, setDiscussor2] = useState(false);
  const [isButton1, setCombutton1] = useState(false);
  const [isButton2, setCombutton2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState(false);
  const [writeButton, setwriteButton] = useState(false);

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
          setThumnail(response.debate.debate.debate_writer.member_thumb);
          setDebDate(response.debate.debate.debate_startDate);
          setDebWriter(response.debate.debate.debate_writer.member_nickName);
          setDebTime(response.debate.debate.debate_time);
          setWriteDate(response.debate.debate.debate_date);
          setDiscuss1(response.debate.detail[0].discuss);
          setDiscuss2(response.debate.detail[1].discuss);
          setContent(response.debate.debate.debate_content);
          setLoginInfo(
            response.logininfo !== "non-member" && response.logininfo
          );
          setDiscussor1(
            response.debate.detail[0].discussor &&
              response.debate.detail[0].discussor.member_no
          );
          setDiscussor2(
            response.debate.detail[1].discussor &&
              response.debate.detail[1].discussor.member_no
          );
          setLoading(false);
        });
    };
    fetchData();
    console.log("logininfo->", loginInfo);
    console.log("discussor1->", discussor1);
    console.log("discussor2->", discussor2);
  }, [url]);

  function login() {
    const social = "118153287897731040607";
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
        console.log("로그인--->", data);
        // console.log("로그인완료", loginInfo);
        if (loginInfo) {
          setwriteButton(writeButton);
        } else {
          setwriteButton(false);
        }
      });

    if (discussor1 == "") {
      console.log("1", discussor1);
      setCombutton1(false);
    } else {
      console.log("2", discussor1);
      setCombutton1(true);
    }
    if (discussor2 == "") {
      console.log("3", discussor2, loginInfo);
      setCombutton2(false);
    } else {
      console.log("4", discussor2);
      setCombutton2(true);
    }
  }

  return (
    <>
      로그인 번호 : {loginInfo.member_no}
      {loading ? <div>Loading...</div> : <div>Loading끝</div>}
      <button onClick={login}>로긴</button>
      <button
        onClick={() => {
          setCombutton1(!isButton1);
        }}
      >
        로긴
      </button>
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
            {/* <img
              src={thumnail}
              style={{ height: "50px", marginLeft: "20px" }}
              alt={"썸네일"}
            ></img> */}

            <label>작성시간 : {writeDate}</label>
          </div>
          <label className="labelDiscuss" style={{ width: "20%" }}>
            주장 1 <br />
            {discussor1}
            <input
              className="inputDiscuss1"
              name="discuss1"
              value={discuss1}
              style={{ textAlign: "center", width: "100%" }}
              readOnly
            ></input>
            {isButton1 && <Button>111</Button>}
            {loading && loginInfo.member_no ? (
              discussor1 === loginInfo.member_no ? (
                <Button>참여취소</Button>
              ) : (
                isButton1 && <Button>토론자1 참여</Button>
              )
            ) : (
              ""
            )}
            {/* {discussor1 ? "" : <Button>토론자1 참여</Button>}
            {discussor1 == loginInfo.member_no ? <Button>참여취소</Button> : ""} */}
          </label>
          <label className="vs" style={{ textAlign: "center", width: "10%" }}>
            {" "}
            VS{" "}
          </label>
          <label className="labelDiscuss" style={{ width: "20%" }}>
            주장 2 <br />
            {discussor2}
            <input
              className="inputDiscuss2"
              name="discuss2"
              value={discuss2}
              style={{ textAlign: "center", width: "100%" }}
              readOnly
            ></input>
            {loading && loginInfo.member_no ? (
              discussor2 === loginInfo.member_no ? (
                <Button>참여취소</Button>
              ) : (
                isButton2 && <Button>토론자2 참여</Button>
              )
            ) : (
              ""
            )}
            {/* {discussor2 ? "" : <Button>토론자 참여</Button>}
            {discussor2 == loginInfo.member_no ? <Button>참여취소</Button> : ""} */}
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

              setCkeditor(editor);
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
          <Link to="/ta_front/debrecruit.html">
            <Button
              className="buttonWrite"
              variant="outline-success"
              size="sm"
              style={{ margin: "10px" }}
              type="submit"
            >
              수정하기
            </Button>
          </Link>
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
