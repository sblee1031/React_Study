import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./component/Header";
import DebateList from "./component/DebateList";
import "react-bootstrap";
import DebWrite from "./component/DebWrite";
import DebateSearch from "./component/DebateSearch";
import DebateView from "./component/DebateView";
import { Container } from "react-bootstrap";
import Footer from "./component/Footer";
import Navbar from "./component/navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container>
          <Navbar />
          <Header />
          <Switch>
            <Route path="/ta_front/debrecruit.html">
              <DebateList />
            </Route>
            <Route path="/ta_front/debrecruit/write">
              <DebWrite />
            </Route>
            <Route path="/ta_front/debrecruit/:no">
              <DebateView />
            </Route>
          </Switch>
          <Footer />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
