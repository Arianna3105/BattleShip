import React from "react";
import Form from "react-bootstrap/Form";
import { FaGithub } from "react-icons/fa6";

const Header = ({ theme, changeTheme }) => {
  return (
    <header className="header">
      <div className="header-row">
        <div>
          <a href="https://github.com/Arianna3105/BattleShip.git" className="gh-btn">
            <FaGithub className="gh-btn-icon" />
          </a>
        </div>

        <span className="title-main">BattleShip </span>

        <div className="chek d-flex align-items-center gap-1 ">
          Dark
          <Form.Check 
            type="switch"
            id="theme"
            checked={theme === "light"}
            onChange={changeTheme}
            variant="dark"
          />
          Light
        </div>
      </div>
    </header>
  );
};

export default Header;
