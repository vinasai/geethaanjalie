import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerFive from "../components/DashBoardLayerFive";


const HomePageFive = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Home" />

        {/* DashBoardLayerFive */}
        <DashBoardLayerFive />



      </MasterLayout>
    </>
  );
};

export default HomePageFive;
