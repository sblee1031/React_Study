import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

export default function DebateList() {
  const [list, setList] = useState({});
  //const [status, setStatus] = useState();

  useEffect(() => {
    fetch(`http://localhost:9999/ta_back/debrecruit/`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("--->", data);

        setList(data);
      });
  }, []);

  //console.log("---->", list);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>토론번호</th>
            <th>토론제목</th>
            <th>작성자</th>
            <th>작성시간</th>
            <th>토론시간</th>
            <th>진행상태</th>
          </tr>
        </thead>
        <tbody>
          {list.debatelist?.map((debate) => (
            <tr key={debate.debate_no}>
              <td>{debate.debate_no}</td>
              <td>{debate.debate_topic}</td>
              <td>{debate.debate_writer}</td>
              <td>{debate.debate_date}</td>
              <td>{debate.debate_time}</td>
              <td>{debate.debate_status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success">
        status : {list.status ? list.status : "로딩"}
      </Button>
    </>
  );
}
