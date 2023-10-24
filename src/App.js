import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { CreatePlayer } from "./Player";
import "./style/App.css";
import Header from "./components/Header";
import Intro from "./components/Intro";
import NewGame from "./components/NewGame";
import Game from "./components/Game";
import Announcer from "./components/Announcer";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [appStatus, setAppStatus] = useState("intro");
  const [winner, setWinner] = useState(null);
  let PlayerOne = CreatePlayer("light", "human");
  let PlayerTwo = CreatePlayer("dark", "computer");
  let timeout = 2000;

  const changeTheme = () => {
    theme === "light" ? setTheme(() => "dark") : setTheme(() => "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <Header theme={theme} changeTheme={changeTheme} />
      <CSSTransition
        in={appStatus === "intro"}
        timeout={timeout}
        classNames="trans"
        unmountOnExit={true}
        onExited={() => setAppStatus("newGame")}
      >
        <Intro setAppStatus={setAppStatus} appStatus={appStatus} />
      </CSSTransition>
      <CSSTransition
        in={appStatus === "newGame"}
        timeout={timeout}
        classNames="trans"
        unmountOnExit={true}
      >
        <NewGame setAppStatus={setAppStatus} setWinner={setWinner}></NewGame>
      </CSSTransition>
      <CSSTransition
        in={appStatus === "game"}
        timeout={timeout}
        classNames="trans"
        unmountOnExit={true}
        theme={theme}
        changeTheme={changeTheme}
      >
        <Game
          player={PlayerOne}
          opponent={PlayerTwo}
          setWinner={setWinner}
          winner={winner}
          setAppStatus={setAppStatus}
          theme={theme}
          changeTheme={changeTheme}
        />
      </CSSTransition>

      <CSSTransition
        in={appStatus === "announcer"}
        timeout={timeout}
        classNames="trans"
        unmountOnExit={true}
        theme={theme}
        changeTheme={changeTheme}
      >
        <Announcer winner={winner} setAppStatus={setAppStatus} />
      </CSSTransition>

      <div className="stars"></div>
      <div className="twinkling"></div>
    </div>
  );
};

export default App;
