import BuildingDescription from "../components/BuildingDescription";
import FloorLists from "../components/FloorLists";
import HeaderText from "../components/HeaderText";
import TopBar from "../components/TopBar";

const DashBoard = () => {
  const floorLists = ["11st Floor", "10st Floor", "9st Floor", "8st Floor"];
  return (
    <>
      <TopBar />
      <HeaderText header={"A Building"}></HeaderText>
      <div className="flex">
        <FloorLists floorLists={floorLists} />
        <BuildingDescription />
      </div>
    </>
  );
};

export default DashBoard;
