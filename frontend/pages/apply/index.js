import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Logout from "../../utils/Logout";
import axiosApiInstance from "../../utils/axiosConfig";

export default function Apply() {
  const router = useRouter();
  const [application, setapplication] = useState({
    cover_letter: "",
    company: "",
  });
  const handleChange = (e) => {
    setapplication({ ...application, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axiosApiInstance.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/candidate/apply`,
      application
    );
    console.log(result);
    setapplication({ ...application, company: "", cover_letter: "" });
  };
  useEffect(() => {
    if (
      !sessionStorage.getItem("access") ||
      sessionStorage.getItem("access") === undefined
    ) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Apply | Applify</title>
        <meta name="description" content="Applify" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col text-black bg-gray-200">
        <nav className="flex bg-white shadow-xl p-2 mb-10 justify-between">
          <div className="text-2xl">Application</div>
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
                router.push("/dashboard");
              }}
            >
              Dash
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
          <form
            className="flex flex-col mx-auto w-1/2 bg-white p-10"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-xl mb-2 border-b-2">
              Application Form
            </h1>
            <i className="text-sm font-light">
              <b className="font-semibold">Disclaimer:</b> Your Profile, work
              experience and educational experience will also be sent to the
              recruiter, if you wish to make any changes to those, please go to
              the profle section and make the necessary changes to your profile
            </i>
            <div className="mt-5">
              <div>Cover Letter*</div>
              <textarea
                type="text"
                name="cover_letter"
                placeholder="Cover Letter to Support your applciation"
                className="w-full bg-slate-100 p-2 font-large text-black shadow-lg mt-2 h-36"
                value={application.cover_letter}
                onChange={handleChange}
              />
            </div>
            <div>
              <div>Company*</div>
              <input
                type="text"
                name="company"
                placeholder="Enter Company Name"
                className="w-full bg-slate-100 p-2 font-large text-black shadow-lg mt-2"
                required
                value={application.company}
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-red-500 p-2 w-fit text-white hover:bg-red-400 mt-10 mx-auto rounded-sm"
              type="submit"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
