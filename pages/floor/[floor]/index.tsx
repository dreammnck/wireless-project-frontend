import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import HeaderText from "../../../components/HeaderText";
import TopBar from "../../../components/TopBar";
import { FloorContext } from "../../../lib/FloorContext";
const RoomLists = () => {
  const router = useRouter();
  const { floor } = router.query;
  const { rooms } = useContext(FloorContext);
  useEffect(() => {
    console.log(rooms, "huha", floor);
  }, []);
  return (
    <>
      <div>
        <TopBar />
        <div className="flex place-content-center">
          <div className="w-[90%] py-8">
            <HeaderText header={"A Building"} />
            <div className="py-8 border-[#8157A1]/50 border-2 rounded-xl">
              <div className="grid grid-rows-7 grid-flow-col p-4">
                {rooms[parseInt(floor as string) - 1].map((room: any) => {
                  return (
                    <div
                      className="border-2 border-[#8157A1]/50 rounded-md p-2 m-2 mx-10 w-[30%] flex place-items-center"
                      onClick={() => {
                        router.push(`/floor/${floor}/room/${room.id}`);
                      }}
                    >
                      <div className="rounded-full w-4 h-4 border-2 border-black bg-green-400"></div>
                      <div className="px-2">room {room.name}</div>
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
