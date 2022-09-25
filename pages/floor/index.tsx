import BuildingDescription from "../../components/BuildingDescription";
import FloorLists from "../../components/FloorLists";
import HeaderText from "../../components/HeaderText";
import TopBar from "../../components/TopBar";

const Floor = () => {
  const floorLists = ["11st Floor", "10st Floor", "9st Floor", "8st Floor"];
  return (
    <>
      <TopBar />
      <div className="flex place-content-center">
        <div className="w-[90%] py-8">
          <HeaderText header={"A Building"} />
          <div className="py-8 border-[#8157A1]/50 border-2 rounded-xl">
            <div className="flex place-content-between">
              <FloorLists floorLists={floorLists} />
              <BuildingDescription />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Floor;
