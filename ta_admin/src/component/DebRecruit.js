import { Table, Modal, InputGroup, Spinner } from "react-bootstrap";
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
  const [approveShow, setApproveShow] = useState(false);
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
        // console.log("???????????????->", loginInfo);
        // setLoading(false);
      });
  }, [page, requestData]);

  const noticeDel = (e) => {
    const { id } = e.target;
    const url = "http://localhost:9999/ta_back/debrecruit/delete/";
    console.log("no=>", url);
    if (window.confirm("?????? ???????????????????")) {
      fetch(url, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          debNo: id,
        }),
        credentials: "include",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("--->", data);
          setRequestData(new Date());
          setShow(false);
          // setLoading(false);
        });
    } else {
      return false;
    }
  };
  const replyView = (e) => {
    const { id } = e.target;

    // console.log("=>", id);
    const url = "http://localhost:9999/ta_back/resultlist/" + id;
    fetch(url, {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--->", data);
        setReplyList(data.commentlist);
        setReplyShow(true);
        // setLoginInfo(data.logininfo);
        // console.log("???????????????->", loginInfo);
        // setLoading(false);
      });
  };
  const replyDelete = (e) => {
    const { id } = e.target;
    const url = "http://localhost:9999/ta_back/resultlist/resultreply/" + id;
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
          if (window.confirm("?????? ???????????????????")) {
            setRequestData(new Date());
            setReplyShow(false);
          } else {
            return false;
          }
        } else if (data.status == 0) {
          alert("?????? ??????", data.msg);
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
        if (data.debate.debate.debate_status === "??????") {
          alert("?????? ????????? ???????????????.");
        } else if (
          data.debate.detail[0].discussor?.member_no == null ||
          data.debate.detail[1].discussor?.member_no == null
        ) {
          alert("???????????? ???????????????.");
        } else {
          setApproveShow(true);
          setTimeout(() => {
            setApproveShow(false);
          }, 3000);
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
              alert("??????");
              setRequestData(new Date());
            });
        }
      });
  };
  const disaprove = (e) => {
    const { id } = e.target;
    const url = "http://localhost:9999/ta_back/admin/disapprove/" + id;
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
        alert("?????? ??????");
        setRequestData(new Date());
      });
  };
  return (
    <>
      <h1>????????????</h1>
      <Table hover>
        <thead
          className="table-warning"
          style={{ fontSize: "15pt", fontWeight: "700" }}
        >
          <tr>
            <td style={{ width: "5%" }}>??????</td>
            <td style={{ width: "15%" }}>??????</td>
            <td style={{ width: "10%" }}>??????</td>
            <td style={{ width: "10%" }}>????????????</td>
            <td style={{ width: "15%" }}>????????????</td>
            <td style={{ width: "5%" }}>?????????</td>
            <td style={{ width: "5%" }}>??????</td>
            <td colSpan="3" style={{ width: "20%" }}>
              ??????
            </td>
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
                {debate.debate_status === "?????????" ? (
                  <button
                    className="btn btn-outline-info"
                    style={{}}
                    id={debate.debate_no}
                    onClick={aprove}
                  >
                    ??????
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-info"
                    style={{}}
                    id={debate.debate_no}
                    onClick={disaprove}
                  >
                    ????????????
                  </button>
                )}
              </td>
              <td>
                <button
                  className="btn btn-outline-success"
                  style={{}}
                  id={debate.debate_no}
                  onClick={replyView}
                >
                  ??????
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  id={debate.debate_no}
                  onClick={noticeDel}
                >
                  ??????
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
              {/* <InputGroup.Text>??????</InputGroup.Text> */}
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
              ??????
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
              <div style={{ marginBottom: "20px" }}>?????? ?????????</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table bordered hover style={{ textAlign: "center" }}>
              <thead className="table-success">
                <tr>
                  <td>?????? ??????</td>
                  <td>?????? ??????</td>
                  <td>?????? ?????????</td>
                  <td>??????</td>
                </tr>
              </thead>
              <tbody className="table-light">
                {replyList?.map((list) => (
                  <tr key={list.com_no}>
                    <td>{list.com_no}</td>
                    <td>{list.com_contents}</td>
                    <td>{list.com_mem.member_nickName}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        id={list.com_no}
                        onClick={replyDelete}
                      >
                        ??????
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </div>
      <Modal
        show={approveShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => {
          return false;
        }}
        centered
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ textAlign: "center", width: "100%" }}
          >
            <h3>????????? ????????? ?????????.</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: "center", margin: "20px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h2>
              <br /> ??????????????? ?????? ?????? ????????? ?????????.
            </h2>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
