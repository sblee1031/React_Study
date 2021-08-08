import "./App.css";
import Hello from "./component/Hello";
import Welcome from "./component/Welcome";
import styles from "./App.module.css";

function App() {
  const name = "Tom";
  const naver = {
    name: "네이버",
    url: "http://naver.com",
  };
  return (
    <div className="App">
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}

export default App;
