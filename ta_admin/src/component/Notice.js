import {
  Table,
  Modal,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Paging from "./pagination/Paging";

export default function Notice(props) {
  console.log("notice props", props.userInfo);
  const [list, setList] = useState({});
  const [page, setPage] = useState(1);
  const [word, setWord] = useState();
  const [requestData, setRequestData] = useState(new Date());
  const [modalContent, setModalContent] = useState();
  const pageSize = 5;
  const [count, setCount] = useState(1);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [writeShow, setWriteShow] = useState(false);
  const [noticeType, setNoticeType] = useState("");
  const [url, setUrl] = useState(
    `http://localhost:9999/ta_back/admin/notice/list?pageNo=${page}&pageSize=${pageSize}`
  );
  function setPage1(page) {
    const listUrl = `http://localhost:9999/ta_back/admin/notice/list?pageNo=${page}&pageSize=${pageSize}`;
    const searchUrl = `http://localhost:9999/ta_back/admin/notice/list/${word}?pageNo=${page}&pageSize=${pageSize}`;
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
  const noticeDel = (e) => {
    const { id } = e.target;
    console.log("=>", id);
    const url = "http://localhost:9999/ta_back/notice/" + id;
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

  return (
    <>
      <h1>공지사항</h1>
      <div>
        <button
          className="btn btn-success"
          onClick={() => {
            setWriteShow(true);
          }}
        >
          공지 작성
        </button>
      </div>
      <Table hover>
        <thead className="table-success">
          <tr>
            <td style={{ width: "5%" }}>번호</td>
            <td style={{ width: "5%" }}>종류</td>
            <td style={{ width: "20%" }}>제목</td>
            <td style={{ width: "15%" }}>날짜</td>
            <td style={{ width: "5%" }}>조회수</td>
            <td style={{ width: "5%" }}>작성자</td>
            <td style={{ width: "15%" }}>작업</td>
          </tr>
        </thead>
        <tbody className="table-light">
          {list.noticelist?.map((notice) => (
            <tr className="table-light" key={notice.notice_no}>
              <td>{notice.notice_no}</td>
              <td>{notice.notice_type}</td>
              <td>
                <Link
                  onClick={() => {
                    console.log("notice=>", notice);
                    setShow(true);
                    setModalContent(notice);
                  }}
                >
                  {notice.notice_title}
                </Link>
              </td>
              <td>{notice.notice_date}</td>
              <td>{notice.notice_views}</td>
              <td>{notice.notice_admin}</td>
              <td>
                <button
                  className="btn btn-outline-success"
                  style={{ marginRight: "10px" }}
                  id={notice.notice_no}
                >
                  수정
                </button>
                <button
                  className="btn btn-outline-success"
                  id={notice.notice_no}
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
              {modalContent?.notice_title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{modalContent?.notice_contents}</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-outline-success"
              style={{ marginRight: "10px" }}
              id={modalContent?.notice_no}
            >
              수정
            </button>
            <button
              className="btn btn-outline-success"
              id={modalContent?.notice_no}
              onClick={noticeDel}
            >
              삭제
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="writeModal">
        <Modal
          show={writeShow}
          onHide={() => setWriteShow(false)}
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
              <div style={{ marginBottom: "20px" }}>
                <DropdownButton
                  variant="outline-secondary"
                  title="공지 종류"
                  id="input-group-dropdown-2"
                  align="end"
                  style={{
                    display: "inline",
                    marginRight: "10px",
                  }}
                >
                  <Dropdown.Item
                    onClick={() => {
                      setNoticeType("공지사항");
                    }}
                  >
                    공지사항
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setNoticeType("이벤트");
                    }}
                  >
                    이벤트
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setNoticeType("업데이트");
                    }}
                  >
                    업데이트
                  </Dropdown.Item>
                </DropdownButton>
                {noticeType}
              </div>
              <InputGroup className="mb-3" size="lg" style={{ width: "95%" }}>
                <InputGroup.Text id="basic-addon1">제목</InputGroup.Text>
                <FormControl
                  placeholder="제목을 입력해주세요."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="lg" style={{ minHeight: "400px" }}>
              <InputGroup.Text>내용</InputGroup.Text>
              <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-outline-success"
              style={{ marginRight: "10px" }}
              id={modalContent?.notice_no}
            >
              작성
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
