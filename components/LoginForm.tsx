import { useRouter } from "next/router";
import TextForm from "./TextForm";

const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    console.log(e.target[0].value, e.target[1].value);
    e.preventDefault();
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
