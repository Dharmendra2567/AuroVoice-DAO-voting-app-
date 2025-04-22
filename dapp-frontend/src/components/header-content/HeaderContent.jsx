import React from "react";
import "./HeaderContent.css"; // Link to the CSS file
// import oneInchLogo from "../assets/1inch-logo.png"; // Replace with your actual image path

const HeaderContent = ({ onVoteClicked }) => {
  return (
    <div className="header-wrapper">
      <div className="header-content">
        <div className="header-left">
          <h4 className="header-subtitle">DAO voting</h4>
          <div type="button" className="dao-tag cursor-pointer"  onClick={onVoteClicked}>Vote To Proposal</div>
          <div type="button" className="dao-tag lg:ml-4">Create Proposal</div>
          <h1 className="header-title">Vote Today, Change Tomorrow</h1>
        </div>
        <div className="header-right">
          <img src="https://img.freepik.com/free-vector/elections-concept-illustration_114360-18490.jpg?semt=ais_hybrid&w=740" alt="1inch Logo" className="logo-image" />
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
