import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HeaderText from "../../../components/HeaderText";
import TopBar from "../../../components/TopBar";
import { instance } from "../../../lib/AxiosInstance";
import { FloorContext } from "../../../lib/FloorContext";
const RoomLists = () => {
  const router = useRouter();
  const { floor } = router.query;
  const {
    floordata,
    setFloor,
    floors,
    setFloors,
    rooms,
    setRooms,
    patients,
    setPatients,
    medicalHistorys,
    setMedicalHistorys,
    infusionHistorys,
    setInfusionHistorys,
  } = useContext(FloorContext);
  const [check, setCheck] = useState(0);
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const callApi = async () => {
    const databro = await Promise.all(
      floordata.map(({ id }: { id: number }) => {
        return instance.get("/floors/" + id.toString()).then((res2) => {
          return res2.data.data;
        });
      })
    );
    console.log("floor", floors);
    console.log("data", databro);
    console.log("romm", rooms);

    setFloors(databro);
  };
  // const {}
  useEffect(() => {
    if (!isCheck) {
      if (
        sessionStorage.getItem("floor") &&
        sessionStorage.getItem("floors") &&
        sessionStorage.getItem("rooms") &&
        sessionStorage.getItem("patients") &&
        sessionStorage.getItem("medicalHistorys") &&
        sessionStorage.getItem("infusionHistorys")
      ) {
        setFloor(JSON.parse(sessionStorage.getItem("floor") as string));
        setFloors(JSON.parse(sessionStorage.getItem("floors") as string));
        setRooms(JSON.parse(sessionStorage.getItem("rooms") as string));
        setPatients(JSON.parse(sessionStorage.getItem("patients") as string));
        setMedicalHistorys(
          JSON.parse(sessionStorage.getItem("medicalHistorys") as string)
        );
        setInfusionHistorys(
          JSON.parse(sessionStorage.getItem("infusionHistorys") as string)
        );
        console.log("here");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setIsCheck(true);
      } else {
        if (
          !floordata.length &&
          !floors.length &&
          !rooms.length &&
          !patients.length &&
          !medicalHistorys.length &&
          !infusionHistorys.length
        ) {
          instance
            .get(process.env.NEXT_PUBLIC_NEXT_API + "/floors", {
              withCredentials: true,
            })
            .then(async (res) => {
              // const clients = await Promise.all(
              //   adminGroups.map(async (group) => {
              //     const list = await teamspeak.serverGroupClientList(group);
              //     return list;
              //   })
              // );
              const databro = await Promise.all(
                res.data.data.floors.map(({ id }: { id: number }) => {
                  return instance
                    .get("/floors/" + id.toString())
                    .then((res2) => {
                      return res2.data.data;
                    });
                })
              );

              setFloor(res.data.data.floors);
              const databro2 = await Promise.all(
                databro.map(async (floor: any) => {
                  const databrotmp = await Promise.all(
                    floor.map((room: any) => {
                      return instance
                        .get("/rooms/" + room.id.toString())
                        .then((res) => {
                          return res.data.data;
                        });
                    })
                  );
                  return databrotmp;
                })
              );

              const databro3 = await Promise.all(
                databro2.map(async (floor: any) => {
                  const databrotmp = await Promise.all(
                    floor.map((room: any) => {
                      return instance
                        .get("/patients/" + room.patients.id.toString())
                        .then((res) => {
                          return res.data.data;
                        });
                    })
                  );
                  return databrotmp;
                })
              );

              const databro4 = await Promise.all(
                databro2.map(async (floor: any) => {
                  const databrotmp = await Promise.all(
                    floor.map((room: any) => {
                      return instance
                        .get(
                          "/patients/" +
                            room.patients.id.toString() +
                            "/medical-history"
                        )
                        .then((res) => {
                          return res.data.data;
                        });
                    })
                  );
                  return databrotmp;
                })
              );
              const databro5 = await Promise.all(
                databro2.map(async (floor: any) => {
                  const databrotmp = await Promise.all(
                    floor.map((room: any) => {
                      return instance
                        .get(
                          "/patients/" +
                            room.patients.id.toString() +
                            "/infusion-history"
                        )
                        .then((res) => {
                          return res.data.data;
                        });
                    })
                  );
                  return databrotmp;
                })
              );
              if (
                databro.length &&
                databro2.length &&
                databro3.length &&
                databro4.length &&
                databro5.length
              ) {
                setLoading(false);
              }
              setFloors(databro);
              setRooms(databro2);
              setPatients(databro3);
              setMedicalHistorys(databro4);
              setInfusionHistorys(databro5);

              sessionStorage.setItem(
                "floor",
                JSON.stringify(res.data.data.floors)
              );
              sessionStorage.setItem("floors", JSON.stringify(databro));
              sessionStorage.setItem("rooms", JSON.stringify(databro2));
              sessionStorage.setItem("patients", JSON.stringify(databro3));
              sessionStorage.setItem(
                "medicalHistorys",
                JSON.stringify(databro4)
              );
              sessionStorage.setItem(
                "infusionHistorys",
                JSON.stringify(databro5)
              );
              setIsCheck(true);

              // setInterval(() => {
              //   console.log(Date.now() - count);

              //   if (Date.now() - count >= 12000) {
              //     const databro = Promise.all(
              //       floor.map(({ id }: { id: number }) => {
              //         return instance
              //           .get("/floors/" + id.toString())
              //           .then((res2) => {
              //             return res2.data.data;
              //           });
              //       })
              //     );
              //     setFloors(databro);
              //     setCount(Date.now());
              //     console.log("reset");
              //   }
              // }, 1000);
            });
        } else {
        }
      }
    } else {
      console.log(floor, "aaa");
      if (floor) {
        instance.get("/floors/" + floor).then((res2) => {
          floors[parseInt(floor as string) - 1] = res2.data.data;
          console.log(floors);
          setFloors(floors);
          sessionStorage.setItem("floors", JSON.stringify(floors));
        });
      }
      const id = setInterval(async () => {
        await callApi();
        setCheck(check + 1);
        console.log("check", check);
      }, 12000);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [check, isCheck]);
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex place-content-center place-items-center text-center">
          Loading
        </div>
      ) : (
        <div>
          <TopBar />
          <div className="flex place-content-center">
            <div className="w-[90%] py-8">
              <HeaderText header={"A Building"} />
              <div className="py-8 border-[#8157A1]/50 border-2 rounded-xl">
                <div className="grid grid-rows-7 grid-flow-col p-4">
                  {floors.length &&
                    floors[parseInt(floor as string) - 1].map((room: any) => {
                      return (
                        <div
                          key={room.id}
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
      )}
    </>
  );
};

export default RoomLists;
