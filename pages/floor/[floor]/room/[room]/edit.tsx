import { useState } from "react";
import TextForm from "../../../../../components/TextForm";
import TopBar from "../../../../../components/TopBar";
import TreatmentHistory from "../../../../../components/TreatmentHistory";

const EditPatientData = () => {
  const handleSubmit = () => {};
  const [data, setData] = useState("");
  const [infusionData, setInfusionData] = useState("");
  return (
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
  );
};

export default EditPatientData;
