import { useState } from "react";
import "./github.scss";
import GitHubCalendar from "react-github-calendar";

export default function Github() {
  const [message, setMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
  };
  return (
    <div className="contact" id="contact">
      <div className="left">
        <img src="assets/shake.svg" alt="" />
      </div>
      <div className="right">
        <h2>Contact.</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
          {message && <span>Thanks, I'll reply ASAP :)</span>}
        </form>
        <div className="calendar"></div>
        <GitHubCalendar username="sblee1031" />
      </div>
      {/* <div class="calendar">Loading the data just for you.</div> */}
    </div>
  );
}
