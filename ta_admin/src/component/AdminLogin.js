import { useRef } from "react";
import "./css/AdminLogin.css";
export default function AdminLogin() {
  const id = useRef(null);
  const pwd = useRef(null);
  const login = () => {
    console.log("클릭", id.current.value, pwd.current.value);
  };
  return (
    <>
      <h1>관리자 페이지</h1>
      <div className="login" style={{ textAlign: "center" }}>
        <div className="loginBox">
          <div className="col">
            <div className="inputBox">
              <input type="text" name="id" ref={id} required="required" />
              <span className="text">관리자 아이디</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="col">
            <div className="inputBox">
              <input type="password" name="pwd" ref={pwd} required="required" />
              <span className="text">비밀번호</span>
              <span className="line"></span>
            </div>
          </div>
          <button className="btn btn-success loginbutton" onClick={login}>
            로그인
          </button>
        </div>
      </div>
    </>
  );
}
