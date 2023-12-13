import React from "react";
import "../styles/user.css";
import Card from "./Card";
import Followers from "./Followers";

const User = () => {
  return (
    <div>
      <section className="section">
        <div className="section-center user-wrapper">
          <Card />
          <Followers />
        </div>
      </section>
    </div>
  );
};

export default User;
