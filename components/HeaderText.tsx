interface propType {
  header: string;
}
const HeaderText = ({ header }: propType) => {
  return (
    <>
      <div className="font-bold text-[#8157A1] text-[32px] flex">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#8157A1] to-[#D27AD3]">
          {header}
        </div>
      </div>
    </>
  );
};

export default HeaderText;
