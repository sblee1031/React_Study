import Topbar from "./components/topbar/Topbar";
import Intro from "./components/intro/Intro";

import Portfolio1 from "./components/portfolio1/Portfolio1";
import Portfolio2 from "./components/portfolio2/Portfolio2";
import Contact from "./components/contact/Contact";
import "./app.scss";
import { useState } from "react";
import Menu from "./components/menu/Menu";
import Aboutme from "./components/aboutme/Aboutme";
import Github from "./components/github/Github";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="sections">
        <Intro />
        <Aboutme />
        <Portfolio1 />
        <Portfolio2 />
        <Github />
        {/* <Works />
        <Testimonials /> */}
        {/* <Contact /> */}
      </div>
    </div>
  );
}

export default App;
