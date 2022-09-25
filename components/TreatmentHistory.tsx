const TreatmentHistory = () => {
  const treatments = ["drinks alcohol", "sleepwell"];
  return (
    <div>
      <div className=" mb-4">ประวัติการรักษา</div>
      <div className="flex">
        <div className="w-1/2 flex place-content-center">
          <div className="w-[90%] p-4 border-[#8157A1]/50 border-2 rounded-xl space-y-4">
            {treatments.map((treatment) => {
              return (
                <div className="p-4 border-2 border-black rounded-xl">
                  {treatment}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/2  flex place-content-center border-[#8157A1]/50 border-2 rounded-xl">
          <div className="p-4 w-[90%]">
            <div>สัญญาณชีพจร</div>
            <div>อุณหภูมิร่างกาย</div>
            <div>อัตราการให้น้ำเกลือ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentHistory;
