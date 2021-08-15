import { useState } from "react";
import UserName from "./UserName";

export default function Hello({ age }) {
  const [name, setName] = useState("Mike");
  const msg = age > 19 ? "성인입니다." : "미성년자 입니다.";
  function changeName() {
    setName(name === "Mike" ? "Jane" : "Mike");
  }
  return (
    <div>
      <h1>Hello</h1>
      <h1 id="name">
        {name}({age}):{msg}
      </h1>
      <UserName name={name} />
      <button onClick={changeName}>Change</button>
    </div>
  );
}
