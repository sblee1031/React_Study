import {
  Table,
  Modal,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paging from "./pagination/Paging";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function DebRecruit(props) {
  console.log("DebRecruit props", props.userInfo);

  const [list, setList] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const pageSize = 5;
  const [word, setWord] = useState();
  const [requestData, setRequestData] = useState(new Date());
  const [modalContent, setModalContent] = useState();
  const [show, setShow] = useState(false);
  const [noticeType, setNoticeType] = useState("");
  const [noticeTitle, setNoticeTitle] = useState();
  const [noticeContent, setNoticeContent] = useState();
  const [noticeNo, setNoticeNo] = useState();
  const [replyShow, setReplyShow] = useState();
  const [replyList, setReplyList] = useState();

  const [url, setUrl] = useState(
    `http://localhost:9999/ta_back/debrecruit/list?pageNo=${page}&pageSize=${pageSize}`
  );

  function setPage1(page) {
    const listUrl = `http://localhost:9999/ta_back/debrecruit/list?pageNo=${page}&pageSize=${pageSize}`;
    const searchUrl = `http://localhost:9999/ta_back/debrecruit/list/${word}?pageNo=${page}&pageSize=${pageSize}`;
    // console.log(url);
    // console.log(page);
    if (word) {
      setUrl(searchUrl);
      setPage(page);
    } else {
      setUrl(listUrl);
      setPage(page);
    }
  }
  useEffect(() => {
    // setLoading(true);
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--->", data);
        //setRequestData(new Date());
        setList(data);
        setCount(data.lastRow);
        // setLoginInfo(data.logininfo);
        // console.log("로그인정보->", loginInfo);
        // setLoading(false);
      });
  }, [page, requestData]);

  const replyView = (e) => {
    const { id } = e.target;
    const url = "http://localhost:9999/ta_back/boardcomment/list/" + id;
    console.log("no=>", url);

    fetch(url, {
      method: "get",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--->", data);
        setReplyList(data.boardcommentlist);
        setReplyShow(true);
        // setLoading(false);
      });
  };
  const noticeDel = (e) => {
    const { id } = e.target;
    // console.log("=>", id);
    const url = "http://localhost:9999/ta_back/admin/board/" + id;
    fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--->", data);
        setRequestData(new Date());
        setShow(false);
        // setLoginInfo(data.logininfo);
        // console.log("로그인정보->", loginInfo);
        // setLoading(false);
      });
  };
  const replyDelete = (e) => {
    const { id } = e.target;
    const url = "http://localhost:9999/ta_back/boardcomment/" + id;
    console.log("no=>", url);

    fetch(url, {
      method: "delete",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--->", data);
        if (data.status == 1) {
          alert("삭제 성공");
          setReplyShow(false);
        } else if (data.status == 0) {
          alert("삭제 실패", data.msg);
        }
        //setReplyList(data.list);
        //setReplyShow(true);
        // setLoading(false);
      });
  };

  const aprove = (e) => {
    const { id } = e.target;
    const url = "http://localhost:9999/ta_back/debrecruit/" + id;
    console.log("no=>", url);

    fetch(url, {
      method: "get",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--->", data);
        if (
          data.debate.detail[0].discussor?.member_no == null ||
          data.debate.detail[1].discussor?.member_no == null
        ) {
          alert("토론자가 비었습니다.");
        } else {
          const url = "http://localhost:9999/ta_back/admin/approve/" + id;
          console.log("no=>", url);

          fetch(url, {
            method: "put",
            headers: { "Content-Type": "application/json" },

            credentials: "include",
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log("--->", data);
              alert("승인");
            });
        }
      });
  };
  return (
    <>
      <h1>토론모집</h1>
      <Table hover>
        <thead
          className="table-info"
          style={{ fontSize: "15pt", fontWeight: "700" }}
        >
          <tr>
            <td style={{ width: "5%" }}>번호</td>

            <td style={{ width: "15%" }}>제목</td>
            <td style={{ width: "10%" }}>날짜</td>
            <td style={{ width: "10%" }}>토론시간</td>
            <td style={{ width: "15%" }}>토론일자</td>
            <td style={{ width: "10%" }}>작성자</td>
            <td style={{ width: "5%" }}>상태</td>
            <td style={{ width: "15%" }}>작업</td>
          </tr>
        </thead>
        <tbody className="table-light">
          {list.debatelist?.map((debate, index) => (
            <tr className="table-light" key={debate.debate_no}>
              <td>{debate.debate_no}</td>

              <td>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    // console.log("notice=>", notice);
                    setShow(true);
                    setModalContent(debate);
                  }}
                >
                  {debate.debate_topic}
                </Link>
              </td>
              <td>{debate.debate_date}</td>
              <td>{debate.debate_time}</td>
              <td>{debate.debate_startDate}</td>
              <td>{debate.debate_writer.member_nickName}</td>
              <td>{debate.debate_status}</td>
              <td>
                <button
                  className="btn btn-outline-info"
                  style={{ marginRight: "10px" }}
                  id={debate.debate_no}
                  onClick={aprove}
                >
                  승인
                </button>
                <button
                  className="btn btn-outline-success"
                  style={{ marginRight: "10px" }}
                  id={debate.debate_no}
                  onClick={replyView}
                >
                  댓글
                </button>

                <button
                  className="btn btn-outline-danger"
                  id={debate.debate_no}
                  onClick={noticeDel}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="paging">
        <Paging page={page} count={count} setPage={setPage1} />
      </div>
      <div className="viewModal">
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          fullscreen="xxl-down"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {modalContent?.debate_topic}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="lg" style={{ minHeight: "400px" }}>
              {/* <InputGroup.Text>내용</InputGroup.Text> */}
              {/* <FormControl
                as="textarea"
                aria-label="With textarea"
                // onChange={(e) => {
                //   setNoticeContent(e.target.value);
                // }}
                readOnly
                value={modalContent?.debate_content}
              /> */}
              <div style={{ width: "100%", minHeight: "300px" }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={modalContent?.debate_content}
                  config={{ toolbar: { items: [] } }}
                  onReady={(editor) => {
                    editor.isReadOnly = true;
                    //setCkeditor(editor);
                    //editor.isReadOnly = { readOnly };
                    // You can store the "editor" and use when it is needed.
                    //console.log("Editor is ready to use!", editor);
                  }}
                />
              </div>
            </InputGroup>
            {/* <p>{modalContent?.notice_contents}</p> */}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-outline-success"
              id={modalContent?.board_no}
              onClick={noticeDel}
            >
              삭제
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="replyModal">
        <Modal
          show={replyShow}
          onHide={() => setReplyShow(false)}
          dialogClassName="modal-100w"
          aria-labelledby="example-custom-modal-styling-title"
          // fullscreen="xxl-down"
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="example-custom-modal-styling-title"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
              }}
            >
              <div style={{ marginBottom: "20px" }}>댓글 리스트</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered hover style={{ textAlign: "center" }}>
              <thead className="table-success">
                <tr>
                  <td>댓글 번호</td>
                  <td>댓글 내용</td>
                  <td>댓글 작성자</td>
                  <td>삭제</td>
                </tr>
              </thead>
              <tbody className="table-light">
                {replyList?.map((list) => (
                  <tr key={list.com_no}>
                    <td>{list.com_no}</td>
                    <td>{list.com_contents}</td>
                    <td>{list.com_member.member_nickName}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        id={list.com_no}
                        onClick={replyDelete}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
