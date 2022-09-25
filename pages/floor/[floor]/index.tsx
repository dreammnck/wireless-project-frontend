import { useRouter } from "next/router";
import HeaderText from "../../../components/HeaderText";
import TopBar from "../../../components/TopBar";
const RoomLists = () => {
  const router = useRouter();
  const { floor } = router.query;
  const roomList = [
    "room 901",
    "room 902",
    "room 903",
    "room 908",
    "room 901",
    "room 902",
    "room 903",
    "room 908",
    "room 901",
    "room 902",
    "room 903",
    "room 908",
  ];
  return (
    <>
      <div>
        <TopBar />
        <div className="flex place-content-center">
          <div className="w-[90%] py-8">
            <HeaderText header={"A Building"} />
            <div className="py-8 border-[#8157A1]/50 border-2 rounded-xl">
              <div className="grid grid-rows-7 grid-flow-col p-4">
                {roomList.map((room) => {
                  return (
                    <div className="border-2 border-[#8157A1]/50 rounded-md p-2 m-2 mx-10 w-[30%] flex place-items-center">
                      <div className="rounded-full w-4 h-4 border-2 border-black bg-green-400"></div>
                      <div className="px-2">{room}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomLists;
