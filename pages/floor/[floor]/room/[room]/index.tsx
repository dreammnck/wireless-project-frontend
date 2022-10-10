import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HeaderText from "../../../../../components/HeaderText";
import PatientData from "../../../../../components/PatientData";
import TopBar from "../../../../../components/TopBar";
import TreatmentHistory from "../../../../../components/TreatmentHistory";
import { instance } from "../../../../../lib/AxiosInstance";
import { FloorContext } from "../../../../../lib/FloorContext";

const Room = () => {
  const router = useRouter();
  const { room, floor } = router.query;
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
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
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
        instance
          .get(
            "/patients/" +
              patients[parseInt(floor as string) - 1][
                (parseInt(room as string) - 1) %
                  patients[parseInt(floor as string) - 1].length
              ].id
          )
          .then((res2) => {
            patients[parseInt(floor as string) - 1][
              (parseInt(room as string) - 1) %
                patients[parseInt(floor as string) - 1].length
            ] = res2.data.data;
            setPatients(patients);
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
      {isLoading ? (
        <>Loading</>
      ) : (
        <div>
          <TopBar />
          <div className="flex place-content-center">
            <div className="w-[90%] py-8">
              <HeaderText
                header={
                  "Room " +
                  room +
                  " " +
                  floorst +
                  " Floor " +
                  " " +
                  " A Building"
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
                      patients.length
                        ? patients[parseInt(floor as string) - 1][
                            (parseInt(room as string) - 1) %
                              patients[parseInt(floor as string) - 1].length
                          ]
                        : { address: { id: "" }, birthDate: "" }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
