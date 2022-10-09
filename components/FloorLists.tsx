import { useRouter } from "next/router";
import { useContext } from "react";
import { FloorContext } from "../lib/FloorContext";

interface propType {
  floorLists: floorType[];
}

interface floorType {
  id: number;
  name: string;
}

const FloorLists = ({ floorLists }: propType) => {
  const router = useRouter();
  // const { name } = useContext(FloorContext);
  // console.log("user ", floorLists);
  return (
    <div className="w-[30%] place-content-center flex">
      <div className="w-[80%] py-6 border-[#8157A1]/50 border-2 rounded-lg">
        {floorLists.map(({ id, name }) => {
          return (
            <div
              className="p-2 "
              onClick={() => {
                router.push(`/floor/${id}`);
              }}
            >
              <div className="border-[#8157A1]/50 border-2 p-2 rounded-md flex place-items-center">
                <div className="rounded-full w-4 h-4 border-2 border-black bg-green-400"></div>
                <div className="px-2">{name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloorLists;
