import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Notice from "./Notice";
import Board from "./Board";
import "./css/bootstrap.css";

export default function AdminList(props) {
  const history = useHistory();
  console.log(props);
  const [selectList, setSelectList] = useState("notice");

  const select = (e) => {
    console.log(e.target.value);
    setSelectList(e.target.value);
  };
  useEffect(() => {
    console.log("useEffect", selectList);
    const url = "/ta_front/admin/" + selectList;
    history.push(url);
  }, [selectList]);

  return (
    <>
      <div className="container">
        <h1>{props.userInfo}님 환영합니다.</h1>
        <div>
          게시판 선택
          <select onChange={select}>
            <option value="notice">공지사항</option>
            <option value="board">자유게시판</option>
            <option value="debrecruite">토론모집</option>
            <option value="debbattle">토론배틀</option>
            <option value="debresult">토론결과</option>
          </select>
        </div>
        <div id="view">
          <BrowserRouter>
            <Switch>
              <Route path="/ta_front/admin/notice">
                <Notice />
              </Route>
              <Route path="/ta_front/admin/board">
                <Board />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}
