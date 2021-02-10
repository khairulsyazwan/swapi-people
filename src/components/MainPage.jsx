import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <h1>Star Wars</h1>
      <h2>
        <Link to="/people">View All People</Link>
      </h2>
    </div>
  );
}

export default MainPage;
