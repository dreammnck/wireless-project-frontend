import axios from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import BuildingDescription from "../../components/BuildingDescription";
import FloorLists from "../../components/FloorLists";
import HeaderText from "../../components/HeaderText";
import TopBar from "../../components/TopBar";
import { instance } from "../../lib/AxiosInstance";

const Floor = () => {
  const floorLists = [
    { id: 11, name: "11st Floor" },
    { id: 11, name: "10st Floor" },
    { id: 11, name: "9st Floor" },
    { id: 11, name: "8st Floor" },
  ];

  const data = axios
    .get(" https://wireless-backend-dev-xiuzo5vrta-df.a.run.app/floors", {
      withCredentials: true,
    })
    .then((res) => console.log(res.data));
  // instance.get("/floors").then((res) => console.log(res.data));
  // const fetcher = (args: any) => instance.get(args).then((res) => res.data);
  // const { data, error } = useSWR(
  //   process.env.NEXT_PUBLIC_NEXT_API + "/floors",
  //   fetcher
  // );
  // data.forEach(({ id }: { id: number }) => {
  //   const { data, error } = useSWR(
  //     process.env.NEXT_PUBLIC_NEXT_API + "/floors/" + id.toString(),
  //     fetcher
  //   );
  // });
  console.log(data);
  // console.log(error);
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <TopBar />
      <div className="flex place-content-center">
        <div className="w-[90%] py-8">
          <HeaderText header={"A Building"} />
          <div className="py-8 border-[#8157A1]/50 border-2 rounded-xl">
            <div className="flex place-content-between">
              <FloorLists floorLists={floorLists} />
              <BuildingDescription />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Floor;
