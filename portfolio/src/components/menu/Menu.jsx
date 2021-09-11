import "./menu.scss";

export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#intro">Home</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#aboutme">About Me</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#portfolio1">Car-Kiosk</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#portfolio2">토론 커뮤니티</a>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <a href="#github">Github</a>
        </li>
      </ul>
    </div>
  );
}
