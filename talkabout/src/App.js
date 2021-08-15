import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./component/Header";
import DebateList from "./component/DebateList";
import "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <DebateList />
      </div>
    </BrowserRouter>
  );
}

export default App;
