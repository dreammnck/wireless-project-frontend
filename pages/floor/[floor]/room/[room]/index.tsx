import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import HeaderText from "../../../../../components/HeaderText";
import PatientData from "../../../../../components/PatientData";
import TopBar from "../../../../../components/TopBar";
import TreatmentHistory from "../../../../../components/TreatmentHistory";
import { FloorContext } from "../../../../../lib/FloorContext";

const Room = () => {
  const router = useRouter();
  const { room, floor } = router.query;
  const { patients } = useContext(FloorContext);
  let floorst = "";
  if (floor == "1") {
    floorst = floor + "st";
  } else if (floor == "2") {
    floorst = floor + "nd";
  } else if (floor == "3") {
    floorst = floor + "rd";
  } else {
    floorst = floor + "th";
  }
  return (
    <div>
      <TopBar />
      <div className="flex place-content-center">
        <div className="w-[90%] py-8">
          <HeaderText
            header={
              "Room " + room + " " + floorst + " Floor " + " " + " A Building"
            }
          />
          <div className="p-8 border-[#8157A1]/50 border-2 rounded-xl">
            <div className="flex">
              <div className="w-[30%]">
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    clipPath: "inset(0 0 0 0)",
                  }}
                >
                  <Image src="/vercel.svg" layout="fill" />
                </div>
              </div>
              <PatientData
                room={room}
                floor={floor}
                patientData={
                  patients[parseInt(floor as string) - 1][
                    parseInt(room as string) - 1
                  ]
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
