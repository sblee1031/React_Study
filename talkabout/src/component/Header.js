import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Header() {
  const [word, setWord] = useState("");
  const search = (e) => {
    setWord(e.target.value);
  };
  const btnsearch = (e) => {
    if (word) {
      // console.log(word);
    } else {
      e.preventDefault();
      alert("검색어를 입력해주세요");
    }
  };
  return (
    <div className="header" style={{ marginTop: "10px" }}>
      <h1>토론 모집</h1>
      <div
        style={{
          textAlign: "right",
          marginRight: "10px",
          display: "block",
        }}
      >
        <label style={{ fontSize: "15pt" }}>
          검색
          <input
            className="word"
            style={{ width: "300px", margin: "10px" }}
            placeholder="제목&내용을 입력해주세요."
            onChange={search}
          ></input>
        </label>
        <Link to={`/ta_front/debrecruit/search/${word}`}>
          <Button
            style={{ marginBottom: "10px" }}
            className="buttons"
            variant="success"
            onClick={btnsearch}
          >
            검색
          </Button>
        </Link>
      </div>
    </div>
  );
}
