import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminLogin from "./component/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="App">
          <Switch>
            <Route path="/ta_front/admin.html">
              <AdminLogin />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
