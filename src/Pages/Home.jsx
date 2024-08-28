import React from "react";
import { Link } from "react-router-dom";
import Login from "../Component/Login"; // Assuming Login component is in a separate file
import "../css/Home.css";

const LoginPageWithContent = () => {
  return (
    <div className="home_container">
      <div className="leftContent">
        <h1>Welcome to Our Internal Hiring Portal</h1>
        <p>
          Our Internal Hiring Portal is a comprehensive web-based solution
          designed to simplify and optimize your organization's internal hiring
          process. With intuitive features and user-friendly interface, our
          portal empowers HR departments and hiring managers to efficiently
          manage internal job postings, applications, and candidate
          evaluations.wjdhsjfdhkje
        </p>
      </div>
      <div className="rightContent">
        <Login />
      </div>
    </div>
  );
};

export default LoginPageWithContent;
