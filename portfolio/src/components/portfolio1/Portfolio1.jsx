import { useState } from "react";
import { GitHub } from "@material-ui/icons";
import "./portfolio1.scss";

export default function Portfolio1() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      id: "1",
      icon: "./assets/mobile.png",
      title: "무인 렌터카 키오스크",
      environment: "* 개발 환경",
      stack: `JAVA 1.8, Window Swing Builder, SpringBoot(2.3.1), SQLite`,
      desc: "렌터카도 무인으로 대여와 반납을 할 수 있도록 제작하였으며, 회원과 비회원 모두 이용가능 합니다. 또한 관리자 페이지를 추가하여, 사업주 입장에서도 관리가 용이하도록 제작했습니다.",
      img: "./assets/kiosk/main.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
    {
      id: "2",
      icon: "./assets/globe.png",
      title: "회원 가입 화면",
      environment: "* 기능",
      stack: "ID중복, PW검사, 전화번호 검사",
      desc: "회원 가입시 필요정보를 입력 받아, DB에 저장합니다. 기존 회원 검사와, 비밀번호 검사, 전화번호 유효성 검사를 진행합니다.",
      img: "./assets/kiosk/signup_check.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
    {
      id: "3",
      icon: "./assets/writing.png",
      title: "대여 반납 화면",
      environment: "* 기능",
      stack: "대여 및 반납 선택",
      desc: "회원 및 비회원 선택 후 대여 반납 화면으로 이동되며, 원하는 메뉴를 선택하여 다음 화면으로 진입합니다.",
      img: "./assets/kiosk/rent_select.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
    {
      id: "4",
      icon: "./assets/writing.png",
      title: "차량 선택 화면",
      environment: "* 기능",
      stack: "제조사 및 차종 선택",
      desc: "현재 제조사는 현대와 기아 두군데 제조사로 제작되었습니다. 제조사별 차종은 소형, 중형, 대형 차량으로 분류 하였습니다. 차종별 이용요금이 상이하며, 현재 대여가능한 차량의 수를 함꼐 표시합니다.",
      img: "./assets/kiosk/car_select.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
    {
      id: "5",
      icon: "./assets/writing.png",
      title: "차량 상세 정보 화면",
      environment: "* 기능",
      stack: "선택한 차량 정보 표시",
      desc: "차종을 선택한 후에는 차량에 대한 세부정보를 표기합니다. 제조사, 모델명, 유종, 연비, 평점, 잔여 수량을 표시합니다.",
      img: "./assets/kiosk/car_detail.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
    {
      id: "6",
      icon: "./assets/writing.png",
      title: "이용 시간 화면",
      environment: "* 기능",
      stack: "이용 시간 선택",
      desc: "이용시간은 10분, 1시간, 3시간, 6시간, 1일, 3일 단위로 선택할 수 있습니다. 여러번 선택시 요금이 증가하며, 이용시간과 금액이 함꼐 표시 됩니다.",
      img: "./assets/kiosk/time_select.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
    {
      id: "7",
      icon: "./assets/writing.png",
      title: "결제 방법 화면",
      environment: "* 기능",
      stack: "결제 방법 선택",
      desc: "선택한 차량에 대한 요금지불을 위한 결제 방법을 선택할 수 있으며, 현재 결제방법 로직은 구현 되어있지 않습니다.",
      img: "./assets/kiosk/payment.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
    {
      id: "8",
      icon: "./assets/writing.png",
      title: "관리자 화면",
      environment: "* 기능",
      stack: "차량추가, 대여 현황 확인",
      desc: "사업주 입장에서 차량을 추가하고, 차량정보를 변경을 위한 관리자페이지를 추가하였습니다. 차량추가 구입이나, 현재 대여 현황을 체크 할 수 있습니다.",
      img: "./assets/kiosk/admin.png",
      github: "https://github.com/sblee1031/Kosta/tree/main/car_Kiosk_210531",
    },
  ];

  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : data.length - 1)
      : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
  };

  return (
    <div className="portfolio1" id="portfolio1">
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
                  <img className="img1" src={d.img} alt="" />
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
      <a className="next" href="#portfolio2">
        <img src="assets/down.png" alt="" />
      </a>
    </div>
  );
}
