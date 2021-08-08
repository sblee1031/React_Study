import { useState } from "react";

export default function Hello() {
  //let name = "Mike";
  const [name, setName] = useState("Mike");

  function changeName() {
    setName(name === "Mike" ? "Jane" : "Mike");
  }
  return (
    <div>
      <h1>Hello</h1>
      <h1 id="name">{name}</h1>
      <button onClick={changeName}>Change</button>
    </div>
  );
}
