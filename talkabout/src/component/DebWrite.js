import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function DebWrite() {
  const [discuss1, setDiscuss1] = useState("");
  const [discuss2, setDiscuss2] = useState("");
  const [editData, setEditData] = useState("");

  const ocDiscuss1 = (e) => {
    setDiscuss1(e.target.value);
  };
  const ocDiscuss2 = (e) => {
    setDiscuss2(e.target.value);
  };
  function debWrite() {
    console.log(discuss1, " / ", discuss2);
    console.log("--->", editData);
  }
  const changeEditor = (event, editor) => {
    const data = editor.getData();
    setEditData(data);
    console.log({ event, editor, data });
  };

  return (
    <>
      {/* <div>{editData2}</div> */}
      {/* https://www.youtube.com/watch?v=_-vCsD7jHh4 */}
      {/* <div
        className="view"
        dangerouslySetInnerHTML={{ __html: editData2 }}
      ></div> */}
      {/* <CKEditor className="ck" editor={ClassicEditor} data={editData2} /> */}
      <div className="writeView">
        <div className="divWriteButton" style={{ textAlign: "right" }}>
          <Button
            className="buttonWrite"
            variant="outline-success"
            size="sm"
            style={{ margin: "10px" }}
            onClick={debWrite}
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
        <div className="divDiscuss">
          <label>
            주장 1 <br />
            <input
              className="inputDiscuss1"
              onChange={ocDiscuss1}
              vlaue={discuss1}
            ></input>
          </label>
          <label> VS </label>
          <label>
            주장 2 <br />
            <input
              className="inputDiscuss2"
              onChange={ocDiscuss2}
              vlaue={discuss2}
            ></input>
          </label>
        </div>
        <div
          className="divEditor"
          style={{ maxHeight: "630px", overflow: "auto" }}
        >
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={changeEditor}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
      </div>
    </>
  );
}
