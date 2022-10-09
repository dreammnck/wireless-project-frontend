import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import TopBar from "../../../../../components/TopBar";
import TreatmentHistory from "../../../../../components/TreatmentHistory";
import { instance } from "../../../../../lib/AxiosInstance";
import { FloorContext } from "../../../../../lib/FloorContext";

const History = () => {
  const { medicalHistorys } = useContext(FloorContext);
  const router = useRouter();
  const { room, floor } = router.query;
  const { floordata, setFloors } = useContext(FloorContext);
  const [check, setCheck] = useState(0);
  const callApi = async () => {
    const databro = await Promise.all(
      floordata.map(({ id }: { id: number }) => {
        return instance.get("/floors/" + id.toString()).then((res2) => {
          return res2.data.data;
        });
      })
    );
    setFloors(databro);
    console.log("reset", databro);
  };
  // const {}
  useEffect(() => {
    const id = setInterval(async () => {
      await callApi();
      setCheck(check + 1);
      console.log("check", check);
    }, 12000);
    return () => clearInterval(id);
  }, [check]);

  const handleChange = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <TopBar />
      <div className="w-full">
        <div className="w-full flex place-content-center">
          <div className="w-[80%] py-10">
            <select
              className="rounded-md p-2 border-[#8157A1] border-2"
              onChange={handleChange}
            >
              <option value="volvo" selected disabled hidden>
                เลือกประวัติการรักษา
              </option>
              <option value="symptom" className="rounded-t-md w-[90%]">
                อาการ
              </option>
              <option value="infusion">อัตราการให้น้ำเกลือ</option>
              <option value="heartbeat">ชีพจร</option>
              <option value="pressure">ความดัน</option>
              <option value="bodyTemperature" className="rounded-b-md">
                อุณหภูมิร่างกาย
              </option>
            </select>
            <TreatmentHistory
              medicalHistorys={
                medicalHistorys[parseInt(floor as string) - 1][
                  parseInt(room as string) - 1
                ]
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
