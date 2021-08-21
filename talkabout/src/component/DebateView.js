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
  const [discuss1, setDiscuss1] = useState(""); //ckeditor 객체
  const [discuss2, setDiscuss2] = useState(""); //ckeditor 객체
  const [content, setContent] = useState("내용"); //ckeditor 객체
  const [writeDate, setWriteDate] = useState(""); //ckeditor 객체
  const [debDate, setDebDate] = useState(""); //ckeditor 객체
  const [debTime, setDebTime] = useState(""); //ckeditor 객체
  const [debWriter, setDebWriter] = useState(""); //ckeditor 객체
  const [thumnail, setThumnail] = useState(""); //ckeditor 객체
  const { no } = useParams();
  const url = `http://localhost:9999/ta_back/debrecruit/${no}`;
  //console.log("url : ", url);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      });
  }, [url]);
  const config = {
    toolbar: {
      items: [
        "bold",
        "italic",
        "|",
        "undo",
        "redo",
        "-",
        "numberedList",
        "bulletedList",
      ],

      viewportTopOffset: 30,

      shouldNotGroupWhenFull: true,
    },
  };
  return (
    <>
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
              width: "25%",
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
            <input
              className="inputDiscuss1"
              name="discuss1"
              value={discuss1}
              style={{ textAlign: "center", width: "100%" }}
              readOnly
            ></input>
          </label>
          <label className="vs" style={{ textAlign: "center", width: "5%" }}>
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
              editor.config.set("toolbar", ["bold", "italic"]);

              console.log(editor);
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
          <Button
            className="buttonWrite"
            variant="outline-success"
            size="sm"
            style={{ margin: "10px" }}
            type="submit"
          >
            수정하기
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
      </div>
    </>
  );
}
