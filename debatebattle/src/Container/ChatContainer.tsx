import * as React from "react";
import { ChatPresenter } from "../Presenter/ChatPresenter";
import "./ChatContainer.scss";
import { message } from "antd";
import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { EnumType } from "typescript";

export type message = {
  username: string;
  content: string;
  type: EnumType;
};

let sockJS = new SockJS("http://localhost:9999/ta_back/ws");
let stompClient: Stomp.Client = Stomp.over(sockJS);
stompClient.debug = () => {};

export const ChatContainer = (props: any) => {
  const logininfo = props.logininfo;
  const debDetail = props.debDetail;
  //console.log("logininfo", logininfo);
  console.log("debDetail", debDetail);
  const [contents, setContents] = React.useState<message[]>([]);
  const [contents2, setContents2] = React.useState<message[]>([]);
  const [username, setUsername] = React.useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    stompClient.connect({}, (b) => {
      console.log(b);
      // console.log("b", b);
      stompClient.subscribe("/topic/discussor", (data) => {
        // console.log("data:", data);
        const newMessage: message = JSON.parse(data.body) as message;
        addMessage(newMessage);
        // console.log("newMessage", newMessage);
      });
      stompClient.subscribe("/topic/audience", (data) => {
        // console.log("data:", data);
        const newMessage: message = JSON.parse(data.body) as message;
        addMessage2(newMessage);
        // console.log("newMessage", newMessage);
      });
    });
  }, [contents, contents2]);

  // useEffect(() => {
  //   stompClient.connect({}, (b) => {
  //     console.log(b);
  //     // console.log("b", b);
  //     stompClient.subscribe("/topic/roomId2", (data) => {
  //       // console.log("data:", data);
  //       const newMessage2: message = JSON.parse(data.body) as message;
  //       addMessage2(newMessage2);
  //       // console.log("newMessage", newMessage);
  //     });
  //   });
  // }, [contents2]);

  const handleEnter = (username: string, content: string, type: EnumType) => {
    const newMessage: message = { username, content, type };
    if (username == "discussor1" || username == "discussor2") {
      stompClient.send("/discussor", {}, JSON.stringify(newMessage));
    } else {
      stompClient.send("/audience", {}, JSON.stringify(newMessage));
    }
    setMessage("");
  };

  const addMessage = (message: message) => {
    setContents((prev) => [...prev, message]);
  };
  const addMessage2 = (message: message) => {
    setContents2((prev) => [...prev, message]);
  };

  return (
    <div className={"container1"}>
      <ChatPresenter
        contents={contents}
        contents2={contents2}
        handleEnter={handleEnter}
        message={message}
        setMessage={setMessage}
        username={username}
        setUsername={setUsername}
      />
    </div>
  );
};
