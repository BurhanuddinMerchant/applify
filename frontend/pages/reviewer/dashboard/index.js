import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Logout from "../../../utils/Logout";
import axiosApiInstance from "../../../utils/axiosConfig";
import { LinkIcon } from "@heroicons/react/solid";
export default function Dashboard() {
  const router = useRouter();
  const [applications, setapplications] = useState([]);
  const getAppliedApplications = async () => {
    const result = await axiosApiInstance.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reviewer/applications`
    );
    console.log(result.data);
    setapplications([...result.data]);
  };
  useEffect(() => {
    if (
      !sessionStorage.getItem("access") ||
      sessionStorage.getItem("access") === undefined
    ) {
      router.push("/reviewer/login");
    }
    getAppliedApplications();
  }, []);
  useEffect(() => console.log(applications), [applications]);
  return (
    <>
      <Head>
        <title>Reviewer Dashboard | Applify</title>
        <meta name="description" content="Applify" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col text-black bg-gray-200">
        <nav className="flex justify-between bg-white shadow-lg mb-10 p-2">
          <div className="my-auto text-2xl">Reviewers Dashboard</div>
          <button
            className="bg-red-500 p-2 w-fit my-auto text-white hover:bg-red-400"
            onClick={() => {
              Logout();
              router.push("/");
            }}
          >
            Logout
          </button>
        </nav>
        <div className="text-black">
          <div className="bg-slate-100 p-5 flex rounded-md w-2/3 mx-auto shadow-lg mb-3 font-bold">
            <div className="w-1/6 text-center">Name</div>
            <div className="w-1/6 text-center">Company</div>
            <div className="w-2/6 text-center">Cover Letter</div>
            <div className="w-1/6 text-center">Status</div>
            <div className="w-1/6 text-center">Detail</div>
          </div>
          {applications.map((application, index) => {
            let status = "text-blue-500";
            return (
              <div
                key={index}
                className="bg-slate-100 p-4 flex rounded-md w-2/3 mx-auto shadow-lg mt-4 hover:bg-slate-50 cursor-pointer justify-evenly"
              >
                <div className="w-1/6 text-center my-auto ">
                  {application.candidate_name}
                </div>
                <div className="w-1/6 text-center my-auto ">
                  {application.company}
                </div>
                <textarea
                  className="w-2/6 p-3 bg-white cursor-not-allowed"
                  value={application.cover_letter}
                  disabled
                />
                <div
                  className={`w-1/6 text-center ${status} font-semibold  my-auto `}
                >
                  {application.status}
                </div>
                <div className="w-1/6 my-auto text-center text-blue-500 hover:text-black">
                  <Link href={`/reviewer/application/${application.id}`}>
                    <div
                      className="my-auto underline text-blue-500 hover:text-black flex w-fit mx-auto"
                      onClick={() => {
                        sessionStorage.setItem(
                          "application_id",
                          application.id
                        );
                      }}
                    >
                      Open{" "}
                      <LinkIcon className="h-5 w-5  my-auto text-blue-500 hover:text-black ml-2" />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
