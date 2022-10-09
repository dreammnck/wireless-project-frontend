import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  return (
    <div className="shadow-lg shadow-gray-300 flex place-content-between place-items-center">
      <div className="p-4 px-10 font-bold text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-[#8157A1] to-[#D27AD3]">
        WL Hospital
      </div>
      <div
        className="p-4 px-10 font-bold text-[20px] border-2 border-[#8157A1] rounded-xl mx-4 text-transparent bg-clip-text bg-gradient-to-r from-[#8157A1] to-[#D27AD3]"
        onClick={() => {
          router.back();
        }}
      >
        Go Back
      </div>
    </div>
  );
};

export default TopBar;
