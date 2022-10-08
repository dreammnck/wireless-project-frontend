import { useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import BuildingDescription from "../components/BuildingDescription";
import FloorLists from "../components/FloorLists";
import HeaderText from "../components/HeaderText";
import TopBar from "../components/TopBar";
import axios from "axios";
import { instance } from "../lib/AxiosInstance";

interface propType {
  fallback: string[];
}

const DashBoard = ({ fallback }: propType) => {
  // const config = {headers:}
  const floorLists = [
    { id: 11, name: "11st Floor" },
    { id: 11, name: "10st Floor" },
    { id: 11, name: "9st Floor" },
    { id: 11, name: "8st Floor" },
  ];
  const fetcher = (args: any) => instance.get(args).then((res) => res);
  // const data = useSWR(process.env.NEXT_PUBLIC_NEXT_API + "/floors", fetcher);
  // const data = useSWR(
  //   "https://wireless-backend-dev-xiuzo5vrta-df.a.run.app" + "/floors",
  //   fetcher
  // );
  const data = instance.get(
    "https://wireless-backend-dev-xiuzo5vrta-df.a.run.app" + "/floors"
  );
  console.log(data);
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <SWRConfig value={{ fallback }}>
      <TopBar />
      <HeaderText header={"A Building"}></HeaderText>
      <div className="flex">
        <FloorLists floorLists={floorLists} />
        <BuildingDescription />
      </div>
    </SWRConfig>
  );
};

export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  const floorLists = ["11st Floor", "10st Floor", "9st Floor", "8st Floor"];
  return {
    props: {
      fallback: {
        "/api/article": floorLists,
      },
    },
  };
}

export default DashBoard;
