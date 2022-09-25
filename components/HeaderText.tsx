interface propType {
  header: string;
}
const HeaderText = ({ header }: propType) => {
  return (
    <>
      <div className="font-bold text-[#8157A1] text-[32px]">{header}</div>
    </>
  );
};

export default HeaderText;
