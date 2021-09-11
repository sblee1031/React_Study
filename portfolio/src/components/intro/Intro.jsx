import "./intro.scss";
import { init } from "ityped";
import { useEffect, useRef } from "react";

export default function Intro() {
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 200,
      strings: [
        "회사와 함께 성장하고 싶습니다.",
        "언제나 즐겁게 소통 합니다.",
        "명품 개발자가 되겠습니다.",
      ],
    });
  }, []);

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="imgContainer">
          <img src="assets/20200426_154127_NoBackground.jpg" alt="" />
        </div>
      </div>
      <div className="right">
        <div className="wrapper">
          <h2>신입</h2>
          <h1>Developer 이석봉 입니다.</h1>
          <h3>
            저는 <span ref={textRef}></span>
          </h3>
        </div>
        <a href="#aboutme">
          <img src="assets/down.png" alt="" />
        </a>
      </div>
    </div>
  );
}
