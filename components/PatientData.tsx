import { useRouter } from "next/router";
import { PatientType } from "../lib/FloorContext";
interface propType {
  room: string | string[] | undefined;
  floor: string | string[] | undefined;
  patientData: PatientType;
}
const PatientData = ({ room, floor, patientData }: propType) => {
  const router = useRouter();
  console.log(patientData, "huhaaa");

  return (
    <div className="px-10 w-[70%]">
      <div>
        <div className="text-lg font-bold w-full border-b-2 border-black">
          ข้อมูลส่วนบุคคล
        </div>
        <div className="grid grid-cols-2 space-x-2 space-y-2">
          <div className="grid pt-2 pl-2">
            <div className="flex place-content-between">
              <div>ชื่อจริง</div>
              <div>{patientData.firstname}</div>
            </div>
            <div className="flex place-content-between">
              <div>เบอร์ผู้ป่วย</div>
              <div>{patientData.phoneNumber}</div>
            </div>
            <div className="flex place-content-between opacity-0">
              <div>เลขบัตรประชาชน</div>
              <div>cc</div>
            </div>
          </div>
          <div className="grid">
            <div className="flex place-content-between">
              <div>นามสกุล</div>
              <div>{patientData.lastname}</div>
            </div>
            <div className="flex place-content-between">
              <div>เบอร์ญาติ</div>
              <div>{patientData.emergencyPhoneNumber}</div>
            </div>
            <div className="flex place-content-between">
              <div>ว/ด/ป เกิด</div>
              <div>{patientData.birthDate.toString()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-lg font-bold w-full border-b-2 border-black">
        รายละเอียดที่อยู่
      </div>
      <div className="grid grid-cols-2  space-x-2 space-y-2">
        <div className="col-span-2 flex place-content-between pl-2 pt-2">
          <div>ที่อยู่</div>
          <div>{patientData.address.id}</div>
        </div>
        <div className="">
          <div className="flex place-content-between">
            <div>จังหวัด</div>
            <div>{patientData.address.province}</div>
          </div>
          <div className="flex place-content-between">
            <div>ตำบล</div>
            <div>{patientData.address.subDistrict}</div>
          </div>
        </div>
        <div className="">
          <div className="flex place-content-between">
            <div>อำเภอ/เขต</div>
            <div>{patientData.address.subDistrict}</div>
          </div>
          <div className="flex place-content-between">
            <div>รหัสไปรษณีย์</div>
            <div>{patientData.address.zipCode}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2  space-x-2 space-y-2 text-center">
        <div className="col-span-2 flex pl-2 pt-2 place-content-end space-x-2">
          <button
            className="bg-[#8157A1] text-white px-6 py-2 flex place-content-center rounded-lg"
            onClick={() => {
              router.push(`/floor/${floor}/room/${room}/history`);
            }}
          >
            ประวัติการรักษา
          </button>
          <button
            className="bg-[#8157A1] text-white px-6 py-2 flex place-content-center rounded-lg"
            onClick={() => {
              router.push(`/floor/${floor}/room/${room}/edit`);
            }}
          >
            เพิ่มการรักษา
          </button>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default PatientData;
