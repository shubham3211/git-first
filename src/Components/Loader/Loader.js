import React from "react";
import "./Loader.css";

const Loader = () => (
  <div id="wave">
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
    <br />
    <span>Fetching Repostories</span>
  </div>
);

export default Loader;
