import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import BuildingDescription from "../../components/BuildingDescription";
import FloorLists from "../../components/FloorLists";
import HeaderText from "../../components/HeaderText";
import TopBar from "../../components/TopBar";
import { instance } from "../../lib/AxiosInstance";
import { FloorContext } from "../../lib/FloorContext";
import { UserContext } from "../../lib/UserContext";

const Floor = () => {
  const { token } = useContext(UserContext);
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
  const [data, setData] = useState([] as any);
  const [data2, setData2] = useState([] as any);
  const [data3, setData3] = useState([] as any);
  const [data4, setData4] = useState([] as any);
  const [data5, setData5] = useState([] as any);
  const [dataT, setDataT] = useState([] as any);
  const [isLoading, setLoading] = useState(true);
  let tmp: any = [];
  let tmp2: any = [];
  let tmp3: any = [];
  let tmp5: any = [];
  let tmp7: any = [];
  let tmp9: any = [];
  const [buildingData, setBuildingData] = useState({});
  const floorLists = [
    { id: 11, name: "11st Floor" },
    { id: 11, name: "10st Floor" },
    { id: 11, name: "9st Floor" },
    { id: 11, name: "8st Floor" },
  ];

  // instance.get("/floors").then((res) => console.log(res.data));
  // const fetcher = (args: any) =>
  //   instance.get(args).then((res) => res.data.data);
  // const { data, error } = useSWR(
  //   process.env.NEXT_PUBLIC_NEXT_API + "/floors",
  //   fetcher
  // );
  //   data.floors.map(({ id }: { id: number }) => {
  //     const { data, error } = useSWR(
  //       process.env.NEXT_PUBLIC_NEXT_API + "/floors/" + id.toString(),
  //       fetcher
  //     );
  //     console.log(id, data);
  //   });
  // console.log(error);
  const getFloor = async (res: any) => {
    const data = await Promise.all(
      res.data.data.floors.map(({ id }: { id: number }) => {
        instance.get("/floors/" + id.toString()).then((res2) => {
          return res2.data.data;
        });
      })
    );
    return data;
  };
  const [check, setCheck] = useState(0);
  const [isCheck, setIsCheck] = useState(false);
  const callApi = async () => {
    const databro = await Promise.all(
      floordata.map(({ id }: { id: number }) => {
        return instance.get("/floors/" + id.toString()).then((res2) => {
          return res2.data.data;
        });
      })
    );
    setFloors(databro);
  };
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
          axios
            .get(process.env.NEXT_PUBLIC_NEXT_API + "/floors", {
              withCredentials: true,
            })
            .then(async (res) => {
              setDataT(res.data.data.floors);
              setBuildingData(res.data.data.buildingInfo);

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
              setData2(tmp2);

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
        }
      }
    } else {
      axios
        .get(process.env.NEXT_PUBLIC_NEXT_API + "/floors", {
          withCredentials: true,
        })
        .then((res) => {
          setDataT(res.data.data.floors);
          setBuildingData(res.data.data.buildingInfo);

          sessionStorage.setItem("floor", JSON.stringify(res.data.data.floors));
          const id = setInterval(async () => {
            await callApi();
            setCheck(check + 1);
            console.log("check", check);
          }, 12000);
          setLoading(false);
          return () => clearInterval(id);
        });
    }
  }, [check, isCheck]);
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <TopBar />
          <div className="flex place-content-center">
            <div className="w-[90%] py-8">
              <HeaderText header={"A Building"} />
              <div className="py-8 border-[#8157A1]/50 border-2 rounded-xl">
                <div className="flex place-content-between">
                  <FloorLists floorLists={dataT ? dataT : floorLists} />
                  <BuildingDescription buildingData={buildingData} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Floor;
