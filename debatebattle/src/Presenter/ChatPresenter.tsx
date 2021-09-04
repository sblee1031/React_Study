import * as React from "react";
import "./ChatPresenter.scss";
import { Button, Input } from "antd";
import { message } from "../Container/ChatContainer";

type ChatPresenterProps = {
  contents: Array<message>;
  contents2: Array<message>;
  message: string;
  username: string;
  setMessage: Function;
  setUsername: Function;
  handleEnter: Function;
};

export const ChatPresenter = ({
  contents,
  contents2,
  message,
  username,
  setMessage,
  setUsername,
  handleEnter,
}: ChatPresenterProps) => {
  console.log("contents", contents);
  console.log("contents2", contents2);

  return (
    <div className={"chat-box"}>
      <div className="header">
        유저이름 :
        <Input
          style={{ flex: 1 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={"contents"}>
        {contents.map((message) =>
          message.username == "discussor1" ? (
            <div className="discuss1">
              {message.username} : {message.content}
            </div>
          ) : (
            <div className="discuss2">
              {message.username} : {message.content}
            </div>
          )
        )}
      </div>
      <hr />
      <div className={"contents"}>
        {contents2.map((message) => (
          <div>
            {message.username} : {message.content}
          </div>
        ))}
      </div>
      <div>
        <Input.Search
          placeholder="input your messages..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSearch={(value) => handleEnter(username, value, "ENTER")}
          enterButton={"Enter"}
        />
      </div>
    </div>
  );
};
