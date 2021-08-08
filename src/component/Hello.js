import World from "./World";

export default function Hello() {
  let name = "Mike";
  function changeName() {
    name = name === "Mike" ? "Jane" : "Mike";
    console.log(name);
    document.getElementById("name").innerText = name;
  }
  return (
    <div>
      <h1>Hello</h1>
      <h1 id="name">{name}</h1>
      <button onClick={changeName}>Change</button>
    </div>
  );
}
