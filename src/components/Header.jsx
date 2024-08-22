import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/user-avatar.svg";
import arrow from "../assets/images/arrow-down.svg";

export default function Header() {
  const [isRotate, setRotate] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to={"/"}>Awesome Kanban Board</Link>
        </div>
        <div className="user" onClick={() => setRotate(!isRotate)}>
          <img src={logo} alt="avatar" className="user-img" />
          <img
            src={arrow}
            alt="arrow"
            className="user-arrow"
            style={{
              transition: "all 200ms linear",
              transform: isRotate ? "scaleY(-1)" : "none",
            }}
          />

          {isRotate && (
            <div className="profile">
              <p>Профиль</p>
              <p>Выйти</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
