import World from "./World";

export default function Hello() {
  function showName() {
    console.log("Mikea");
  }
  function showAge(age) {
    console.log(age);
  }
  function showText(e) {
    console.log(e.target.value);
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={showName}>show name</button>
      <button
        onClick={() => {
          showAge(10);
        }}
      >
        Show age
      </button>
      <input type="text" onChange={showText} />
    </div>
  );
}
