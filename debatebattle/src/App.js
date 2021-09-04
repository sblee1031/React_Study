import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import DebateBattleList from "./component/DebateBattleList";
import DebateBattleDetail from "./component/DebateBattleDetail";
import { useState } from "react";
// import ChatMessageBox from "./component/ChatMessageBox";
function App() {
  // alert("app");
  const [logininfo, setLogininfo] = useState();
  const getLoginInfo = (logininfo) => {
    //로그인 정보
    setLogininfo(logininfo);
  };

  return (
    // <ChatMessageBox />
    <BrowserRouter>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/ta_front/debbattle.html">
              <DebateBattleList setLoginInfo={getLoginInfo} />
            </Route>
            <Route
              path="/ta_front/debbattle/:no"
              component={DebateBattleDetail}
            ></Route>
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
