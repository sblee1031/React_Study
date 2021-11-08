import { useState } from "react";
import { GitHub } from "@material-ui/icons";
import "./portfolio2.scss";

export default function Portfolio2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      id: "1",
      icon: "./assets/mobile.png",
      title: "토론 커뮤니티",
      environment: "* 개발 환경",
      stack: `JAVA 1.8, SpringBoot(2.5.3), Mybatis(2.2.0), OracleDB 11g, WebSocket, BootStrap4, React`,
      desc: "누구든지 자유롭게 주제를 제안하고, 토론하는 공간 입니다. 다른 사람의 의견도 함께 공유할 수 있는 커뮤니티 입니다. 다른사람과 토론일정을 잡고, 채팅기능을 이용하여 토론자와 관중들과 함께 라이브 채팅으로 투표까지 진행하여 토론진행 할 수 있습니다.",
      img: "./assets/ta/main.png",
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "2",
      icon: "./assets/globe.png",
      title: "로그인 화면",
      environment: "* 기능",
      stack: "카카오, 구글 소셜 로그인",
      desc: "카카오, 구글을 통해서만 가입이 가능하며, 다른 가입 방식은 지원하지 않으며, 필수적인 개인정보만 DB에 저장합니다. 또한 부적절한 컨텐츠를 관리하기 위한 관리자 페이지도 구현 하였습니다.",
      img: "./assets/ta/login.png",
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "3",
      icon: "./assets/globe.png",
      title: "신규 가입 화면",
      environment: "* 기능",
      stack: "소셜 인증 후 회원가입",
      desc: "카카오, 구글을 통해 인증받은 정보를 화면에 표시하여, 닉네임, 생년월을 입력 받습니다. 닉네임은 고유PK값으로 중복을 허용하지 않습니다.",
      img: "./assets/ta/signup.png",
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "4",
      icon: "./assets/writing.png",
      title: "토론 모집 화면",
      environment: "* 기능",
      stack: "주제 작성, 보기, 검색, 페이징",
      desc: "비회원일 경우 보기기능만 되며, 회원의 경우 CRUD 기능 이용 가능합니다.",
      img: "./assets/ta/recruit.png",
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "5",
      icon: "./assets/writing.png",
      title: "토론 모집 작성 화면",
      environment: "* 기능",
      stack: "일자, 시간, 주장, 내용 입력",
      desc: "토론을 제안하기 위한 토론일자, 토론시간, 주장1, 주장2, 내용을 작성하기 위한 화면 입니다. 토론 내용은 CKEdior5를 사용하여, URL링크 및 YouTube 링크 첨부가 가능합니다.",
      img: "./assets/ta/recruit_write.png",
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "6",
      icon: "./assets/writing.png",
      title: "토론 날짜 선택 화면",
      environment: "* 기능",
      stack: "Datepicker API",
      desc: "토론날짜 선정을 위해 Datepicker API를 사용 하였으며, 현재 시간보다 1시간 뒤 부터 선택할 수 있습니다. ",
      img: "./assets/ta/recruit_datepicker.png",
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "7",
      icon: "./assets/writing.png",
      title: "토론 참여 신청 화면",
      environment: "* 기능",
      stack: "토론자 신청, 취소",
      desc: "토론자1, 토론자2는 중복될 수 없으며, 토론자신청 후 토론자 취소 버튼이 활성화 되어 취소 할 수 있습니다. 또한 토론자1, 토론자2가 모두 선정되었을 경우 관리자에게 토론 승인 메일이 발송 됩니다.",
      img: "./assets/ta/in_discussor.png",
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "8",
      icon: "./assets/writing.png",
      title: "토론 승인 요청 메일",
      environment: "",
      stack: "관리자에게 메일 발송 화면",
      desc: "토론자1, 토론자2가 모두 선정 될 경우 관리자에게 토론 승인을 위한 메일이 자동 발송 됩니다. javax.mail 라이브러리를 사용하여, SMTP 메일 발송 합니다.",
      img: "./assets/ta/approve_mail.png",
      imgWidth: { width: "580px" },
      github: "https://github.com/sblee1031/talkabout",
    },
    {
      id: "9",
      icon: "./assets/writing.png",
      title: "토론 배틀 화면",
      environment: "* 기능",
      stack: "실시간 채팅, 토론자 근거 등록",
      desc: "토론 배틀시 실시간 채팅이 가능하며, 토론자는 위쪽 채팅방과 관중은 아래쪽 채팅방을 이용합니다. 또한 토론자는 본인 주장에 따른 근거를 등록할 수 있습니다. 채팅은 WebSocket을 이용하였으며, 채팅과 근거의 내용은 실시간으로 모든 이용자 화면에 반영 됩니다.",
      img: "./assets/ta/debbattle.png",
      imgWidth: { width: "800px" },
      github: "https://github.com/sblee1031/talkabout",
    },
  ];

  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : data.length - 1)
      : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
  };

  return (
    <div className="portfolio2" id="portfolio2">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {data.map((d) => (
          <div className="container">
            <div className="item">
              <div className="left">
                <div className="leftContainer">
                  {/* <div className="imgContainer"> */}
                  {/* <img src={d.img} alt="" /> */}
                  {/* </div> */}
                  <h2 className="title">{d.title}</h2>
                  <div className="info">
                    <h2>
                      {d.environment}
                      <br />
                      {d.stack}
                    </h2>

                    <br />
                    {d.desc}
                  </div>
                  <div className="imageinfo">
                    <a href={d.github} target="_blank" rel="noreferrer">
                      <GitHub />
                      Github
                    </a>
                    <br />
                    <p>이미지를 클릭하시면 크게 보실 수 있습니다.</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <a href={d.img} target="_blank" rel="noreferrer">
                  <img className="img1" style={d.imgWidth} src={d.img} alt="" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        src="assets/arrow.png"
        className="arrow left"
        alt=""
        onClick={() => handleClick("left")}
      />
      <img
        src="assets/arrow.png"
        className="arrow right"
        alt=""
        onClick={() => handleClick()}
      />
      <a className="next" href="#more">
        <img src="assets/down.png" alt="" />
      </a>
    </div>
  );
}
