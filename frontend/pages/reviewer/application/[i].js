import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Logout from "../../../utils/Logout";
import axiosApiInstance from "../../../utils/axiosConfig";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
export default function Dashboard() {
  var router = useRouter();
  const [formData, setFormData] = useState({
    works: [],
    academics: [],
    candidate_id: [],
    cover_letter: "",
    company: "",
    feedback: "",
    candidate_name: "",
    candidate_email: "",
    skills: [],
    resume: false,
    links: [],
  });
  const getApplicationDetail = async (id) => {
    const result = await axiosApiInstance.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reviewer/application/${id}`
    );
    console.log(result.data);
    setFormData({ ...result.data, feedback: "" });
  };
  useEffect(() => {
    var id = router.query["i"];
    if (
      !sessionStorage.getItem("access") ||
      sessionStorage.getItem("access") === undefined
    ) {
      router.push("/reviewer/login");
    }
    if (id === undefined && !sessionStorage.getItem("application_id")) {
      router.push("/reviewer/dashboard");
    }
    id = id === undefined ? sessionStorage.getItem("application_id") : id;
    getApplicationDetail(id);
  }, []);
  return (
    <>
      <Head>
        <title>Application Detail | Applify</title>
        <meta name="description" content="Applify" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col text-black bg-gray-200">
        <nav className="flex justify-between bg-white shadow-lg mb-10 p-2">
          <div className="my-auto flex ">
            <button
              className="bg-red-500 p-2 w-fit text-white hover:bg-red-400 mr-4  "
              onClick={() => {
                router.push("/reviewer/dashboard");
              }}
            >
              <ArrowNarrowLeftIcon className="w-5 h-5 my-auto" />
            </button>
            <div className="my-auto">
              Candidate {formData.candidate_id} profile
            </div>
          </div>
          <button
            className=" bg-red-500 p-2 my-auto w-fit text-white hover:bg-red-400"
            onClick={() => {
              Logout();
              router.push("/");
            }}
          >
            Logout
          </button>
        </nav>
        <div>
          <form className="bg-slate-50 w-2/3 mx-auto p-10" disabled>
            <div className="font-bold">
              {" "}
              Candidate {formData.candidate_id} Information
            </div>
            <div className="flex">
              <label className="my-auto mr-3">Name: </label>
              <input
                value={formData["candidate_name"]}
                className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                placeholder="Candidate Name"
                disabled
              />
            </div>
            <div className="flex">
              <label className="my-auto mr-3">Email: </label>
              <input
                value={formData["candidate_email"]}
                className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                placeholder="Candidate Email"
                disabled
              />
            </div>
            {formData.works.map((data, index) => {
              return (
                <div
                  key={index}
                  className="border-t-2 border-gray-400 flex flex-col"
                >
                  <div className="flex justify-between mt-2 mb-2">
                    <div className="my-auto font-medium">
                      Work Experience {index + 1}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <input
                      value={formData["works"][index]["company"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Company Name"
                      required
                      disabled
                      name={`works.${index}.company`}
                    />
                    <input
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      value={formData["works"][index]["role"]}
                      placeholder="Role"
                      required
                      disabled
                      name={`works.${index}.role`}
                    />
                    <input
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Location"
                      value={formData["works"][index]["location"]}
                      required
                      disabled
                      name={`works.${index}.location`}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/4">
                      <div className="my-auto mr-2">Start Date</div>
                      <input
                        className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 rounded-sm w-full h-fit my-auto"
                        value={formData["works"][index]["start_date"]}
                        type="date"
                        required
                        disabled
                        name={`works.${index}.start_date`}
                      />
                    </div>
                    <div className="w-1/4">
                      <div className="my-auto mr-2">End Date:</div>
                      <input
                        className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 w-full rounded-sm h-fit"
                        type="date"
                        value={formData["works"][index]["end_date"]}
                        disabled
                        name={`works.${index}.end_date`}
                      />
                    </div>
                    <div className="my-auto w-1/4">
                      Currently Working: {"    "}
                      <input
                        className="p-2 bg-slate-100  shadow-none my-auto border-gray-200 border-2 rounded-sm text-white"
                        defaultChecked={
                          formData["works"][index]["currently_working"]
                        }
                        type="checkbox"
                        disabled
                        name={`works.${index}.currently_working`}
                      />
                    </div>
                  </div>
                  <textarea
                    className="p-2 bg-slate-100 my-4 shadow-none border-gray-200 border-2 rounded-sm h-36"
                    placeholder="describe your work"
                    value={formData["works"][index]["description"]}
                    disabled
                    name={`works.${index}.description`}
                  />
                </div>
              );
            })}

            {formData.academics.map((data, index) => {
              return (
                <div
                  key={index}
                  className="border-t-2 border-gray-400 flex flex-col"
                >
                  <div className="flex justify-between mt-2 mb-2">
                    <div className="my-auto font-medium">
                      Educational Experience {index + 1}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <input
                      value={formData["academics"][index]["institute"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Institute Name"
                      disabled
                      name={`academics.${index}.institute`}
                    />
                    <input
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Location"
                      value={formData["academics"][index]["location"]}
                      disabled
                      name={`academics.${index}.location`}
                    />
                    <input
                      value={formData["academics"][index]["degree"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Degree"
                      disabled
                      name={`academics.${index}.degree`}
                    />
                    <input
                      value={formData["academics"][index]["gpa"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-2/12"
                      placeholder="GPA"
                      disabled
                      name={`academics.${index}.gpa`}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/4">
                      <div className="my-auto mr-2">Start Date</div>
                      <input
                        className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 rounded-sm w-full h-fit my-auto"
                        value={formData["academics"][index]["start_date"]}
                        type="date"
                        required
                        disabled
                        name={`academics.${index}.start_date`}
                      />
                    </div>
                    <div className="w-1/4">
                      <div className="my-auto mr-2">End Date:</div>
                      <input
                        className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 w-full rounded-sm h-fit"
                        type="date"
                        value={formData["academics"][index]["end_date"]}
                        disabled
                        name={`academics.${index}.end_date`}
                      />
                    </div>
                    <div className="my-auto w-1/4">
                      Currently Working: {"    "}
                      <input
                        className="p-2 bg-slate-100  shadow-none my-auto border-gray-200 border-2 rounded-sm text-white"
                        defaultChecked={
                          formData["academics"][index]["currently_studying"]
                        }
                        type="checkbox"
                        disabled
                        name={`academics.${index}.currently_studying`}
                      />
                    </div>
                  </div>
                  <textarea
                    className="p-2 bg-slate-100 my-4 shadow-none border-gray-200 border-2 rounded-sm h-36"
                    placeholder="describe your work"
                    value={formData["academics"][index]["description"]}
                    disabled
                    name={`academics.${index}.description`}
                  />
                </div>
              );
            })}
            <div className="my-auto font-medium border-t-2 border-gray-400">
              Websites
            </div>
            {Object.keys(formData.links).map((key, index) => {
              console.log(index);
              return (
                <div className="flex justify-between mt-2" key={index}>
                  <input
                    value={formData["links"][index]["name"]}
                    className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-5/12"
                    placeholder="Website Name"
                    name={`links.${index}.name`}
                  />
                  <a
                    className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 text-blue-500 underline hover:text-black border-2 rounded-sm w-5/12"
                    placeholder="https://"
                    href={formData["links"][index]["link"]}
                    name={`links.${index}.link`}
                  >
                    {formData["links"][index]["link"]}
                  </a>
                </div>
              );
            })}
            <div className="border-b-2 border-gray-400"></div>
            <div className="my-auto font-medium mt-2">Skills</div>
            <div className="border-b-2 border-gray-400 flex flex-wrap">
              {Object.keys(formData.skills).map((key, index) => {
                console.log(index);
                return (
                  <div
                    key={index}
                    className="flex justify-start mt-2 w-1/5 p-1 flex-col"
                  >
                    <input
                      value={formData["skills"][index]["name"]}
                      className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 rounded-sm w-full"
                      placeholder="Skill"
                      disabled
                      name={`skills.${index}.name`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="border-b-2 border-gray-400">
              <label>
                Cover Letter
                <textarea
                  className="p-2 bg-slate-100 my-4 w-full shadow-none border-gray-200 border-2 rounded-sm h-36"
                  placeholder="describe your work"
                  value={formData["cover_letter"]}
                  disabled
                />
              </label>
            </div>
            {formData["resume"] ? (
              <div className="mb-2 mt-2">
                <div>Resume</div>
                <a
                  rel="noreferrer"
                  href={`${
                    process.env.NEXT_PUBLIC_SERVER_BASE_URL
                  }/reviewer/resume/${sessionStorage.getItem(
                    "application_id"
                  )}`}
                  target="_blank"
                  className=" bg-red-500 text-white px-2 py-1 hover:bg-red-400 mb-2 "
                >
                  Download
                </a>
              </div>
            ) : (
              ""
            )}
            <div className="border-t-2 border-gray-400">
              <label>
                Your Feedback
                <textarea
                  className="p-2 bg-slate-100 my-4 w-full shadow-none border-gray-200 border-2 rounded-sm h-36"
                  placeholder="describe your work"
                  value={formData["feedback"]}
                  onChange={(e) => {
                    setFormData({ ...formData, feedback: e.target.value });
                  }}
                />
              </label>
            </div>
            <div className="mx-auto w-fit mt-2">
              <button
                className="bg-green-600 p-1 rounded-sm text-white cursor-pointer w-48 text-center mr-2 hover:bg-green-500"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await axiosApiInstance.post(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reviewer/review`,
                    {
                      id: sessionStorage.getItem("application_id"),
                      status: "ACCEPTED",
                      feedback: formData["feedback"],
                    }
                  );
                  sessionStorage.setItem("application_id", undefined);
                  router.push("/reviewer/dashboard");
                }}
              >
                Accept
              </button>
              <button
                className="bg-red-600 p-1 rounded-sm text-white cursor-pointer w-48  text-center ml-2 hover:bg-red-500"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await axiosApiInstance.post(
                    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/reviewer/review`,
                    {
                      id: sessionStorage.getItem("application_id"),
                      status: "REJECTED",
                      feedback: formData["feedback"],
                    }
                  );
                  sessionStorage.setItem("application_id", undefined);
                  router.push("/reviewer/dashboard");
                }}
              >
                Reject
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
