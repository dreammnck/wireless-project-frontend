const TreatmentHistory = ({ medicalHistorys }: any) => {
  const treatments = ["drinks alcohol", "sleepwell"];
  return (
    <div>
      <div className="flex">
        <div className="">
          <div className="p-4 border-b-2 border-black grid grid-cols-4 rounded-xl">
            <div className="p-2">timestamp</div>
            <div className="p-2 col-span-2">อาการ</div>
            <div className="p-2">ผู้บันทึก</div>
          </div>
          {medicalHistorys.map((treatment: any) => {
            return (
              <div className="w-full p-4 border-b-2 border-black grid grid-cols-4 rounded-xl">
                <div className="p-2">{treatment.createdDate}</div>
                <div className="p-2 col-span-2">{treatment.medicalHistory}</div>
                <div className="p-2">{treatment.doctor}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TreatmentHistory;
