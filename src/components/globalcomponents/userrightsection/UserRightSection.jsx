import React from "react";
import AllProfiles from "../../Rightcomponents/AllProfiles/AllProfiles";
import "./userrightsection.scss";
const UserRightSection = () => {
  return (
    <div>
      <div className="top-text-container">
        <p>User Profiles</p>
      </div>
      <AllProfiles />
    </div>
  );
};

export default UserRightSection;
