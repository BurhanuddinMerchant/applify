import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Logout from "../../utils/Logout";
import axiosApiInstance from "../../utils/axiosConfig";

export default function Dashboard() {
  const router = useRouter();
  const [applications, setapplications] = useState([]);
  const getAppliedApplications = async () => {
    const result = await axiosApiInstance.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/candidate/applied`
    );
    console.log(result.data);
    setapplications([...result.data]);
  };
  useEffect(() => {
    if (
      !sessionStorage.getItem("access") ||
      sessionStorage.getItem("access") === undefined
    ) {
      router.push("/login");
    }
    getAppliedApplications();
  }, []);
  useEffect(() => console.log(applications), [applications]);
  return (
    <>
      <Head>
        <title>Dashboard | Applify</title>
        <meta name="description" content="Applify" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col text-black bg-gray-200">
        <nav className="flex bg-white shadow-xl p-2 mb-10 justify-between">
          <div className="text-2xl">Dashboard</div>
          <div className="w-1/6 flex justify-evenly">
            <button
              className="bg-red-500 p-1 w-20 text-white hover:bg-red-400"
              onClick={() => {
                Logout();
                router.push("/");
              }}
            >
              Logout
            </button>
            <button
              className="bg-red-500 p-1 w-20 text-white hover:bg-red-400"
              onClick={() => {
                router.push("/apply");
              }}
            >
              Apply
            </button>
            <button
              className="bg-red-500 p-1 w-20 text-white hover:bg-red-400"
              onClick={() => {
                router.push("/profile");
              }}
            >
              Profile
            </button>
          </div>
        </nav>
        <div className="text-black">
          <div className="bg-slate-100 p-5 flex rounded-full w-1/2 mx-auto shadow-lg mb-3 font-bold">
            <div className="w-1/3 text-center">Company</div>
            <div className="w-1/3 text-center">Feedback</div>
            <div className="w-1/3 text-center">Status</div>
          </div>
          {applications.map((application, index) => {
            let status = "text-blue-500";
            if (application.status === "ACCEPTED") {
              status = "text-green-500";
            } else if (application.status === "REJECTED") {
              status = "text-red-500";
            }
            return (
              <div
                key={index}
                className="bg-slate-100 p-4 flex rounded-full w-1/2 mx-auto shadow-lg mt-4 hover:bg-slate-50 cursor-pointer hover:scale-105"
              >
                <div className="w-1/3 text-center ">{application.company}</div>
                <div className="w-1/3 text-center ">{application.feedback}</div>
                <div className={`w-1/3 text-center ${status} font-semibold`}>
                  {application.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
