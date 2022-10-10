import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import TextForm from "../../../../../components/TextForm";
import TopBar from "../../../../../components/TopBar";
import TreatmentHistory from "../../../../../components/TreatmentHistory";
import { instance } from "../../../../../lib/AxiosInstance";
import { FloorContext } from "../../../../../lib/FloorContext";

const EditPatientData = () => {
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    instance.post(
      `/patients/${
        patients[parseInt(floor as string) - 1][
          (parseInt(room as string) - 1) %
            patients[parseInt(floor as string) - 1].length
        ].id
      }/infusion-history`,
      { dropRate: parseInt(e.target[1].value) }
    );
    instance.post(
      `/patients/${
        patients[parseInt(floor as string) - 1][
          (parseInt(room as string) - 1) %
            patients[parseInt(floor as string) - 1].length
        ].id
      }/medical-history`,
      { medicalHistory: e.target[0].value }
    );
  };
  const [data, setData] = useState("");
  const [infusionData, setInfusionData] = useState<number>();
  const [isInfusionData, setIsInfusionData] = useState(false);

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
    console.log(router.asPath, "aaaasx");

    if (!isInfusionData) {
      if (
        infusionHistorys.length &&
        infusionHistorys[parseInt(floor as string) - 1]
      ) {
        if (
          infusionHistorys[parseInt(floor as string) - 1][
            parseInt(room as string) - 1
          ]
        ) {
          setInfusionData(
            infusionHistorys[parseInt(floor as string) - 1][
              parseInt(room as string) - 1
            ][0].dropRate
          );
        }
      } else {
        setInfusionData(0);
      }
    }

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
          100;
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
                  return await Promise.all(
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
              console.log(databro5);

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

      console.log("na", patients);
      console.log("Aaaa", infusionHistorys);

      if (floor && infusionHistorys.length) {
        instance
          .get(
            "/patients/" +
              patients[parseInt(floor as string) - 1][
                (parseInt(room as string) - 1) %
                  patients[parseInt(floor as string) - 1].length
              ].id +
              "/infusion-history"
          )
          .then((res2) => {
            infusionHistorys[parseInt(floor as string) - 1][
              (parseInt(room as string) - 1) %
                infusionHistorys[parseInt(floor as string) - 1].length
            ] = res2.data.data;
            setInfusionHistorys(infusionHistorys);
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
    <div>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div>
          <TopBar />
          <div className="w-full">
            <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
              login
            </div>
            <div className="flex place-content-center">
              <div className="border-2 border-[#8157A1] w-[80%] h-[80%] rounded-3xl">
                <form
                  className="flex flex-col space-y-2 p-8"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-4 pt-4 text-[20px]">
                    <div>อาการ</div>
                    <textarea
                      className="w-full h-full border-2"
                      value={data}
                      onChange={(e: any) => {
                        setData(e.target.value);
                      }}
                    />
                    <div className="flex w-1/2 place-content-between">
                      <div className="w-[40%]">อัตราการให้น้ำเกลือ</div>
                      <input
                        type="text"
                        className="w-[40%] border-2"
                        value={infusionData}
                        onChange={(e: any) => {
                          setInfusionData(e.target.value);
                        }}
                      />
                      <div className="w-[20%]">mL/h</div>
                    </div>
                    <div className="flex w-1/2 place-content-between">
                      <div className="w-[40%]">ความดัน</div>
                      <div className="w-[40%]">120/80</div>
                      <div className="w-[20%]">mmHg</div>
                    </div>
                    <div className="flex w-1/2">
                      <div className="w-[40%]">อุณหภูมิร่างกาย</div>
                      <div className="w-[40%] place-content-end">36</div>
                      <div>C</div>
                    </div>
                    <div className="flex w-1/2">
                      <div className="w-[40%]">ชีพจร</div>
                      <div className="w-[40%] place-content-end">123</div>
                      <div>bpm</div>
                    </div>
                  </div>

                  <div className="flex place-content-end">
                    <button className="bg-[#8157A1] text-white px-10 p-2 rounded-md">
                      เสร็จสิ้น
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPatientData;
