import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import HeaderText from "../../../components/HeaderText";
import TopBar from "../../../components/TopBar";
import { FloorContext } from "../../../lib/FloorContext";
const RoomLists = () => {
  const router = useRouter();
  const { floor } = router.query;
  const { rooms } = useContext(FloorContext);
  // const {}
  useEffect(() => {
    console.log(rooms, "huha", floor);
    setTimeout(function () {
      console.log("after");
    }, 10000);
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
                      className="border-2 border-[#8157A1]/50 rounded-md p-2 m-2 mx-10 w-[50%] flex place-items-center"
                      onClick={() => {
                        router.push(`/floor/${floor}/room/${room.id}`);
                      }}
                    >
                      {room.isTrigger ? (
                        <div className="rounded-full w-4 h-4 border-2 border-black bg-red-500"></div>
                      ) : (
                        <div className="rounded-full w-4 h-4 border-2 border-black bg-green-400"></div>
                      )}
                      <div className="px-2 flex place-content-between w-full">
                        <div>room {room.name}</div>
                        <div>
                          {room.estimateFinishTime &&
                            " [" + room.estimateFinishTime + "]"}
                        </div>
                      </div>
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
