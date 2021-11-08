import "./aboutme.scss";
import { Create, Email, PhoneAndroid, Room } from "@material-ui/icons";

export default function Aboutme() {
  return (
    <div className="aboutme" id="aboutme">
      <h1>About Me</h1>
      <div className="container">
        <div className="card featured">
          <div className="top">
            <h1>Back End</h1>
          </div>
          <div className="icons">
            <img className="java" src="assets/skill/java.png" alt="" />
            <img className="tomcat" src="assets/skill/tomcat.png" alt="" />
            <img
              className="servlet"
              src="assets/skill/servlet,jsp.png"
              alt=""
            />
            <img className="spring" src="assets/skill/spring.png" alt="" />
            <img
              className="springboot"
              src="assets/skill/springboot.png"
              alt=""
            />
            <img className="mybatis" src="assets/skill/mybatis.png" alt="" />
            <img className="oracle" src="assets/skill/oracle.png" alt="" />
          </div>
          <div className="bottom"></div>
        </div>
        <div className="card featured">
          <div className="top">
            <h1>Infomation</h1>
          </div>
          <div className="info">
            <div className="itemcontainer">
              <Create className="icon" />
              <span>학력 : 가천대학교 (경영학 석사)</span>
            </div>
            <div className="itemcontainer">
              <Room className="icon" />
              <span>주소 : 경기도 성남시 분당구</span>
            </div>
            <div className="itemcontainer">
              <Email className="icon" />
              <span>메일 : leebbong@naver.com</span>
            </div>
            <div className="itemcontainer">
              <PhoneAndroid className="icon" />
              <span>전화 : - </span>
            </div>
            <div className="certificate">
              <h2>Certificate</h2>
              <img src="assets/skill/qnet.jpg" alt="" />
              <h3>2015 - 정보처리 산업기사</h3>
              <h3>2021 - MSA Full-Stack 양성과정 수료</h3>
            </div>
          </div>
          <div className="bottom"></div>
        </div>
        <div className="card featured">
          <div className="top">
            <h1>Front End</h1>
          </div>
          <div className="frontend">
            <div className="icons">
              <img className="html" src="assets/skill/html,js,css.png" alt="" />
              <br />
              <img className="jquery" src="assets/skill/jquery.png" alt="" />
              <img className="react" src="assets/skill/react.png" alt="" />
            </div>
            <hr />
            <h2>Tools</h2>
            <img className="eclipse" src="assets/skill/eclipse.png" alt="" />
            <img className="vscode" src="assets/skill/vscode.png" alt="" />
            <img
              className="sourcetree"
              src="assets/skill/SourceTree.png"
              alt=""
            />
          </div>

          <div className="bottom"></div>
        </div>
      </div>
      <a className="next" href="#portfolio1">
        <img src="assets/down.png" alt="" />
      </a>
    </div>
  );
}
