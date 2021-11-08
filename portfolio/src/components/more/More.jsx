import "./more.scss";
import ReactGitHubCalendar from "react-ts-github-calendar";

export default function More() {
  return (
    <div className="more" id="more">
      <div className="container">
        <h1>My GitHub</h1>
        <div className="calendar">
          <ReactGitHubCalendar userName="sblee1031" />
        </div>
        <h1>My Tistory</h1>
        <div className="playcode">
          <a
            href="http://playcode.tistory.com"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./assets/skill/playcod_logo.png" alt="" />
            <br />
            코드랑 놀아보자
          </a>
        </div>
      </div>
      <a className="top" href="#intro">
        <img src="assets/down.png" alt="" />
        <p>TOP</p>
      </a>
    </div>
  );
}
