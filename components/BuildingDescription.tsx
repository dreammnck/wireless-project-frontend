const BuildingDescription = () => {
  return (
    <div className="w-[70%] flex place-content-center">
      <div className=" w-[90%] p-10 py-4 border-[#8157A1]/50 border-2 rounded-lg">
        <div className="text-3xl font-bold text-transparent ">
          <div className="bg-clip-text bg-gradient-to-r from-[#41ABCCF5] to-[#D27AD3]">
            History
          </div>
        </div>
        <div className="">
          “ตึกลูกเต๋า”
          ชื่ออย่างไม่เป็นทางการของอาคารพิพิธภัณฑ์วิทยาศาสตร์มหาราชินี
          องค์การพิพิธภัณฑ์วิทยาศาสตร์แห่งชาติ (อพวช.)
          ดูจะเป็นชื่อที่คุ้นหูผู้คนทั่วไป มากกว่าชื่อ “พิพิธภัณฑ์วิทยาศาสตร์”
          ของ อพวช. ด้วยเหตุที่รูปทรงของอาคารพิพิธภัณฑ์วิทยาศาสตร์
          มีลักษณะเป็นรูปทรงลูกบาศก์ 3
          ลูกวางพิงกันและตั้งอยู่ได้อย่างน่าอัศจรรย์ จึงเป็นที่มาของชื่อ
          “ตึกลูกเต๋า” นั่นเอง ไม่น่าเชื่อว่า “ตึกลูกเต๋า”
          ที่ตั้งตระหง่านท้าลมแดดฝนของเมืองไทยอย่างทรนง
          จะทำหน้าที่เล่าเรื่องราวทางวิทยาศาสตร์ให้กับเยาวชนและผู้คนทั่วไปมาแล้วกว่า
          20 ปี ในปี พ.ศ. 2563 คอลัมน์พิเศษ
          จึงขอเล่าเรื่องราวเกี่ยวกับตึกลูกเต๋า
          ในมุมที่คิดว่าหลายคนยังไม่เคยรู้ให้ได้ทราบกัน
        </div>
        <div className="text-3xl font-bold text-transparent ">
          <div className="bg-clip-text bg-gradient-to-r from-[#41ABCCF5] to-[#D27AD3]">
            Patient
          </div>
        </div>
        <div className="w-[75%]">
          <div className="flex place-content-between">
            <div>เตียงรองรับผู้ป่วยทั้งหมด</div>
            <div>เตียง</div>
          </div>
          <div className="flex place-content-between">
            <div>ผู้ป่วยที่ใช้บริการทั้งหมด</div>
            <div>เตียง</div>
          </div>
          <div className="flex place-content-between">
            <div>เหลือเตียงในการให้บริการทั้งหมด</div>
            <div>เตียง</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingDescription;
