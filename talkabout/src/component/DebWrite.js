import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import Datepick from "./Datepick";
import "react-datepicker/dist/react-datepicker.css";

export default function DebWrite(props) {
  const [discuss1, setDiscuss1] = useState("");
  const [discuss2, setDiscuss2] = useState("");
  const [editData, setEditData] = useState("");
  const [ckeditor, setCkeditor] = useState({}); //ckeditor 객체
  const [debateDate, setDebateDate] = useState("");
  const [debateTime, setDebateTime] = useState("30");
  const history = useHistory();
  const ocDiscuss1 = (e) => {
    setDiscuss1(e.target.value);
  };
  const ocDiscuss2 = (e) => {
    setDiscuss2(e.target.value);
  };
  const debWrite = (Event) => {
    Event.preventDefault();
    //console.log(Event.target);
    console.log(discuss1, " / ", discuss2);
    console.log("에디터->", editData);
    if (
      debateDate === "" ||
      editData === "" ||
      discuss1 === "" ||
      discuss2 === ""
    ) {
      alert("모두 입력해주세요");
    } else {
      const Debate = {
        //debate_no: 1,
        debate_content: editData,
        debate_topic: discuss1 + " VS " + discuss2,
        discuss1: discuss1,
        discuss2: discuss2,
        debateDate: debateDate,
        debateTime: debateTime,
      };
      // const detail = { discuss: discuss1 };
      //const data = { Debate, detail };
      //console.log(data);

      const url = `http://localhost:9999/ta_back/debrecruit/write`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Debate),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("결과->", data);
          history.push("/ta_front/debrecruit.html");
        });
    }
  };
  const changeEditor = (event, editor) => {
    const data = editor.getData();
    setEditData(data);
    console.log(data);
    //console.log({ event, editor, data });
  };
  function getCurrentDate() {
    //현재시간 구하는 함수
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = date.getMonth() + 1;
    month = month < 10 ? "0" + month.toString() : month.toString();
    var day = date.getDate();
    day = day < 10 ? "0" + day.toString() : day.toString();
    var hour = date.getHours();
    hour = hour < 10 ? "0" + hour.toString() : hour.toString();
    if (Number.parseInt(hour) + 1 === 24) {
      hour = "00";
    }
    var minites = date.getMinutes();
    minites = minites < 10 ? "0" + minites.toString() : minites.toString();

    return year + "-" + month + "-" + day + " " + hour + ":" + minites + ":00"; // 현재시간보다 1시간 추가 ,최소 시작시간은 한시간 뒤부터 가능.
  }
  const ocDebateDate = (e) => {
    //  console.log(getCurrentDate(e));
    //const year = e.getYears
    setDebateDate(getCurrentDate(e));
    // console.log(debateDate);
  };
  const ocDebateTime = (e) => {
    setDebateTime(e.target.value);
    //console.log(debateTime);
  };
  // function click() {
  //   console.log(debateDate, "/", debateTime);
  // }

  return (
    <>
      {/* https://www.youtube.com/watch?v=_-vCsD7jHh4 */}
      {/* <button onClick={click}>버튼</button> */}

      <div className="writeView">
        <form onSubmit={debWrite}>
          <div className="debDate" style={{ fontSize: "10pt" }}>
            <label className="labelDebDate">
              토론일자
              {/* <input
                type="datetime-local"
                id="inputDebate_date"
                onChange={ocDebateDate}
                value={debateDate}
              /> */}
              <Datepick setDate={ocDebateDate} />
            </label>
            <label className="labelDebDate">
              토론제한시간
              <br />
              <select
                id="selectDebate_time"
                name="selectDebate_time"
                onChange={ocDebateTime}
                value={debateTime}
              >
                <option value="30">30분</option>
                <option value="60">60분</option>
                <option value="120">120분</option>
              </select>
            </label>
          </div>
          <div className="divDiscuss" style={{ width: "100%" }}>
            <label className="labelDiscuss">
              주장 1 <br />
              <input
                className="inputDiscuss1"
                name="discuss1"
                style={{ width: "100%" }}
                onChange={ocDiscuss1}
                vlaue={discuss1}
              ></input>
            </label>
            <label className="vs"> VS </label>
            <label className="labelDiscuss">
              주장 2 <br />
              <input
                className="inputDiscuss2"
                name="discuss2"
                style={{ width: "100%" }}
                onChange={ocDiscuss2}
                vlaue={discuss2}
              ></input>
            </label>
          </div>
          <div className="divEditor" style={{ maxHeight: "630px" }}>
            <CKEditor
              editor={ClassicEditor}
              data=""
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "outdent",
                  "indent",
                  "|",
                  "blockQuote",
                  "insertTable",
                  "mediaEmbed",
                  "undo",
                  "redo",
                ],
                placeholder: "내용을 입력해주세요",
              }}
              onReady={(editor) => {
                setCkeditor(editor);
                //editor.isReadOnly = { readOnly };
                // You can store the "editor" and use when it is needed.
                //console.log("Editor is ready to use!", editor);
              }}
              onChange={changeEditor}
              // onBlur={(event, editor) => {
              //   console.log("Blur.", editor);
              // }}
              // onFocus={(event, editor) => {
              //   console.log("Focus.", editor);
              // }}
            />
          </div>
          <div
            className="divWriteButton"
            style={{ textAlign: "right", display: "inline-block" }}
          >
            <Button
              className="buttonWrite"
              variant="outline-success"
              size="sm"
              style={{ margin: "10px" }}
              type="submit"
            >
              작성하기
            </Button>
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
        </form>
      </div>
    </>
  );
}
