import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Paging from "./pagination/Paging";
import { InputGroup, FormControl } from "react-bootstrap";

export default function DebateList() {
  const [list, setList] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const pageSize = 5;

  //const pageNo = page;
  //console.log(pageNo);
  const [word, setWord] = useState();
  const [url, setUrl] = useState(
    `http://localhost:9999/ta_back/debrecruit/list?pageNo=${page}&pageSize=${pageSize}`
  );
  const search = (e) => {
    setWord(e.target.value);
  };
  const btnsearch = (e) => {
    //const searchUrl = `http://localhost:9999/ta_back/debrecruit/list/${word}?pageNo=${page}&pageSize=${pageSize}`;
    if (word) {
      setPage1(1);
      //setUrl(url);
    } else {
      e.preventDefault();
      alert("검색어를 입력해주세요");
    }
  };
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
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log("--->", data);
        setList(data);
        setCount(data.lastRow);
      });
  }, [url]);

  return (
    <>
      <div
        style={{
          textAlign: "right",
          marginRight: "10px",
          display: "block",
        }}
      >
        <label style={{ fontSize: "15pt", fontWeight: "600" }}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              검색
            </InputGroup.Text>

            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="제목&내용"
              onChange={search}
            />
          </InputGroup>
          {/* 검색
          <input
            className="word"
            style={{ width: "300px", margin: "10px", fontSize: "14pt" }}
            placeholder="제목&내용을 입력해주세요."
            onChange={search}
          ></input> */}
        </label>

        <Button
          style={{ marginLeft: "10px" }}
          className="buttons"
          variant="success"
          onClick={btnsearch}
        >
          검색
        </Button>
      </div>
      <div className="divButton" style={{ textAlign: "right", margin: "10px" }}>
        <Link
          className="write"
          style={{ textDecoration: "none", textDecorationColor: "black" }}
          to={"/ta_front/debrecruit/write"}
        >
          <Button className="buttons" variant="success">
            토론 작성
          </Button>
        </Link>
      </div>
      <Table responsive="xl" hover>
        <thead>
          <tr style={{ fontSize: "14pt" }}>
            <th style={{ width: "10%" }}>토론번호</th>
            <th style={{ width: "25%" }}>토론제목</th>
            <th style={{ width: "10%" }}>작성자</th>
            <th style={{ width: "15%" }}>작성시간</th>
            <th style={{ width: "10%" }}>토론시간</th>
            <th style={{ width: "10%" }}>진행상태</th>
          </tr>
        </thead>
        <tbody>
          {list.debatelist?.map((debate) => (
            <tr key={debate.debate_no}>
              <td>{debate.debate_no}</td>
              <td>
                <Link to={`/ta_front/debrecruit/${debate.debate_no}`}>
                  {debate.debate_topic}
                </Link>
              </td>
              <td>{debate.debate_writer.member_nickName}</td>
              <td>{debate.debate_date}</td>
              <td>{debate.debate_time}</td>
              <td>{debate.debate_status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="paging">
        <Paging page={page} count={count} setPage={setPage1} />
      </div>
      {/* <Button variant="success">
        status : {list.status ? list.status : "로딩"}
      </Button> */}
    </>
  );
}