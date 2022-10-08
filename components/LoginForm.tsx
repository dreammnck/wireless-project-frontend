import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useContext } from "react";
import { instance } from "../lib/AxiosInstance";
import { UserContext } from "../lib/UserContext";
import TextForm from "./TextForm";
import { setCookie } from "cookies-next";

const LoginForm = () => {
  const router = useRouter();
  const { setUsername, setPassword, setToken } = useContext(UserContext);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value);
    const payload: { username: string; password: string } = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    instance.post("/auth/login", payload).then((res) => {
      console.log(res);
      setUsername(e.target[0].value);
      setPassword(e.target[1].value);
      setToken(res.data.data);
      // setCookie("token", res.data.data);
      router.push("/floor");
    });
  };
  return (
    <div className="w-full">
      <div className="pt-10 py-6 text-center font-bold text-[32px] text-[#8157A1] text-to-[#D27AD3]">
        login
      </div>
      <div className="flex place-content-center">
        <div className="border-2 border-[#8157A1] w-[80%] rounded-3xl">
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-4 pt-10">
              <TextForm sidetext="username" type="text" />
              <TextForm sidetext="password" type="password" />
            </div>
            <div className="flex place-content-center py-6">
              <button className="bg-[#8157A1] text-white px-10 p-2 rounded-md">
                login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
