import React from "react";
import { Link } from "react-router-dom";
import Logo from "../media/logo.svg";

function MainPage() {
  return (
    <div>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center container">
          <div className="my-3">
            <h1>THE PEOPLE OF</h1>
          </div>
          <div>
            <img src={Logo} alt="Star Wars" />
          </div>
          <div className="my-4">
            <button className="btn-lg btn-light">
              <Link
                to="/people"
                style={{ color: "black", textDecoration: "none" }}
              >
                <h2>Begin Exploring</h2>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
