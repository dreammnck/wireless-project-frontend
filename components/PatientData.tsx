const PatientData = () => {
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
              <div>aa</div>
            </div>
            <div className="flex place-content-between">
              <div>เบอร์ผู้ป่วย</div>
              <div>bb</div>
            </div>
            <div className="flex place-content-between">
              <div>เลขบัตรประชาชน</div>
              <div>cc</div>
            </div>
          </div>
          <div className="grid">
            <div className="flex place-content-between">
              <div>นามสกุล</div>
              <div>dd</div>
            </div>
            <div className="flex place-content-between">
              <div>เบอร์ญาติ</div>
              <div>ee</div>
            </div>
            <div className="flex place-content-between">
              <div>ว/ด/ป เกิด</div>
              <div>ff</div>
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
          <div>gg</div>
        </div>
        <div className="">
          <div className="flex place-content-between">
            <div>จังหวัด</div>
            <div>hh</div>
          </div>
          <div className="flex place-content-between">
            <div>ตำบล</div>
            <div>ii</div>
          </div>
        </div>
        <div className="">
          <div className="flex place-content-between">
            <div>อำเภอ/เขต</div>
            <div>jj</div>
          </div>
          <div className="flex place-content-between">
            <div>รหัสไปรษณีย์</div>
            <div>kk</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientData;
