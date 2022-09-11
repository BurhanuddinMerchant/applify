import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Logout from "../../utils/Logout";
import axiosApiInstance from "../../utils/axiosConfig";
import { DocumentRemoveIcon, DownloadIcon } from "@heroicons/react/solid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const workUnit = () =>
  Object.assign(
    {},
    {
      start_date: null,
      end_date: null,
      currently_working: false,
      description: "",
      location: "",
      role: "",
      company: "",
    }
  );
const academicUnit = () =>
  Object.assign(
    {},
    {
      start_date: null,
      end_date: null,
      currently_studying: false,
      description: "",
      location: "",
      institute: "",
      gpa: "",
      degree: "",
    }
  );
const linkUnit = () => Object.assign({}, { name: "", link: "" });
const skillUnit = () => Object.assign({}, { name: "" });

export default function Profile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    works: [workUnit()],
    academics: [academicUnit()],
    links: [linkUnit()],
    skills: [skillUnit()],
  });
  const printDocument = () => {
    const input = document.getElementById("resume");
    let height = input.offsetHeight * 0.0104166667;
    let width = input.offsetWidth * 0.0104166667;
    html2canvas(input, {
      scale: 1,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "in", [height, width]);
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output("dataurlnewwindow");
      pdf.save("resume.pdf");
    });
  };
  useEffect(() => {
    if (
      !sessionStorage.getItem("access") ||
      sessionStorage.getItem("access") === undefined
    ) {
      router.push("/login");
    }
    getUserProfile();
  }, []);
  const getUserProfile = async () => {
    const result = await axiosApiInstance.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/candidate/profile`
    );
    console.log(result.data);
    setFormData({ ...formData, ...result.data });
  };
  useEffect(() => console.log(formData), [formData]);
  const handleChange = (e) => {
    const details = e.target.name.split(".");
    if (
      details[2] === "currently_working" ||
      details[2] === "currently_studying"
    ) {
      formData[details[0]][details[1]][details[2]] =
        !formData[details[0]][details[1]][details[2]];
      if (formData[details[0]][details[1]][details[2]] === true) {
        formData[details[0]][details[1]]["end_date"] = null;
      }
    } else {
      formData[details[0]][details[1]][details[2]] = e.target.value;
    }
    setFormData({ ...formData });
  };
  const handleRemove = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    const details = e.target.name.split(".");
    formData[details[0]].splice(details[1], 1);
    setFormData({ ...formData });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const response = await axiosApiInstance.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/candidate/profile`,
      formData
    );
    console.log(response);
  };
  return (
    <>
      <Head>
        <title>Profile | Applify</title>
        <meta name="description" content="Applify" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col text-black bg-gray-200">
        <nav className="flex bg-white shadow-xl p-2 mb-10 justify-between">
          <div className="text-2xl">Profile</div>
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
                router.push("/dashboard");
              }}
            >
              Dash
            </button>
          </div>
        </nav>
        <div>
          <form
            className="bg-slate-50 w-2/3 mx-auto p-10"
            onSubmit={handleSubmit}
            id="resume"
          >
            <div className="font-bold"> Personal Information</div>
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
                    <button
                      className="bg-red-600 p-1 rounded-sm text-white cursor-pointer "
                      name={`works.${index}`}
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <input
                      value={formData["works"][index]["company"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Company Name"
                      required
                      onChange={handleChange}
                      name={`works.${index}.company`}
                    />
                    <input
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      value={formData["works"][index]["role"]}
                      placeholder="Role"
                      required
                      onChange={handleChange}
                      name={`works.${index}.role`}
                    />
                    <input
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Location"
                      value={formData["works"][index]["location"]}
                      required
                      onChange={handleChange}
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
                        onChange={handleChange}
                        name={`works.${index}.start_date`}
                      />
                    </div>
                    <div className="w-1/4">
                      <div className="my-auto mr-2">End Date:</div>
                      <input
                        className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 w-full rounded-sm h-fit"
                        type="date"
                        disabled={formData["works"][index]["currently_working"]}
                        value={formData["works"][index]["end_date"]}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        name={`works.${index}.currently_working`}
                      />
                    </div>
                  </div>
                  <textarea
                    className="p-2 bg-slate-100 my-4 shadow-none border-gray-200 border-2 rounded-sm h-36"
                    placeholder="describe your work"
                    value={formData["works"][index]["description"]}
                    onChange={handleChange}
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
                    <button
                      className="bg-red-600 p-1 rounded-sm text-white cursor-pointer "
                      name={`academics.${index}`}
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <input
                      value={formData["academics"][index]["institute"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Institute Name"
                      required
                      onChange={handleChange}
                      name={`academics.${index}.institute`}
                    />
                    <input
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Location"
                      value={formData["academics"][index]["location"]}
                      required
                      onChange={handleChange}
                      name={`academics.${index}.location`}
                    />
                    <input
                      value={formData["academics"][index]["degree"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-3/12"
                      placeholder="Degree"
                      required
                      onChange={handleChange}
                      name={`academics.${index}.degree`}
                    />
                    <input
                      value={formData["academics"][index]["gpa"]}
                      className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-2/12"
                      placeholder="GPA"
                      required
                      onChange={handleChange}
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
                        onChange={handleChange}
                        name={`academics.${index}.start_date`}
                      />
                    </div>
                    <div className="w-1/4">
                      <div className="my-auto mr-2">End Date:</div>
                      <input
                        className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 w-full rounded-sm h-fit"
                        type="date"
                        disabled={
                          formData["academics"][index]["currently_studying"]
                        }
                        value={formData["academics"][index]["end_date"]}
                        onChange={handleChange}
                        name={`academics.${index}.end_date`}
                      />
                    </div>
                    <div className="my-auto w-1/4">
                      Currently Studying: {"    "}
                      <input
                        className="p-2 bg-slate-100  shadow-none my-auto border-gray-200 border-2 rounded-sm text-white"
                        defaultChecked={
                          formData["academics"][index]["currently_studying"]
                        }
                        type="checkbox"
                        onChange={handleChange}
                        name={`academics.${index}.currently_studying`}
                      />
                    </div>
                  </div>
                  <textarea
                    className="p-2 bg-slate-100 my-4 shadow-none border-gray-200 border-2 rounded-sm h-36"
                    placeholder="describe your work"
                    value={formData["academics"][index]["description"]}
                    onChange={handleChange}
                    name={`academics.${index}.description`}
                  />
                </div>
              );
            })}
            <div className="my-auto font-medium">Websites</div>
            {Object.keys(formData.links).map((key, index) => {
              console.log(index);
              return (
                <div className="flex justify-between mt-2" key={index}>
                  <input
                    value={formData["links"][index]["name"]}
                    className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-5/12"
                    placeholder="Website Name"
                    required
                    onChange={handleChange}
                    name={`links.${index}.name`}
                  />
                  <input
                    className="p-2 bg-slate-100 my-2 shadow-none border-gray-200 border-2 rounded-sm w-5/12"
                    placeholder="https://"
                    value={formData["links"][index]["link"]}
                    required
                    onChange={handleChange}
                    name={`links.${index}.link`}
                  />
                  <button
                    className=" p-1 rounded-sm text-red-600 underline hover:text-red-400 cursor-pointer "
                    name={`links.${index}`}
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            <div className="border-b-2 border-gray-400"></div>
            <div className="my-auto font-medium">Skills</div>
            <div className="border-b-2 border-gray-400 flex flex-wrap">
              {Object.keys(formData.skills).map((key, index) => {
                console.log(index);
                return (
                  <div
                    className="flex justify-start mt-2 w-1/5 p-1 flex-col"
                    key={index}
                  >
                    <button
                      className="rounded-sm text-red-600 underline hover:text-red-400 cursor-pointer "
                      name={`skills.${index}`}
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                    <input
                      value={formData["skills"][index]["name"]}
                      className="p-2 bg-slate-100 shadow-none border-gray-200 border-2 rounded-sm w-full"
                      placeholder="Skill"
                      required
                      onChange={handleChange}
                      name={`skills.${index}.name`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mx-auto w-fit mt-2">
              <button
                className="bg-blue-600 p-1 rounded-sm text-white cursor-pointer w-48 text-center mr-2 hover:bg-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  formData["works"].push(workUnit());
                  setFormData({ ...formData });
                }}
              >
                Add Work Experience
              </button>
              <button
                className="bg-blue-600 p-1 rounded-sm text-white cursor-pointer w-48  text-center ml-2 hover:bg-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  formData["academics"].push(academicUnit());
                  setFormData({ ...formData });
                }}
              >
                Add Education
              </button>
              <button
                className="bg-blue-600 p-1 rounded-sm text-white cursor-pointer w-48  text-center ml-2 hover:bg-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  formData["links"].push(linkUnit());
                  setFormData({ ...formData });
                }}
              >
                Add Website
              </button>
              <button
                className="bg-blue-600 p-1 rounded-sm text-white cursor-pointer w-48  text-center ml-2 hover:bg-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  formData["skills"].push(skillUnit());
                  setFormData({ ...formData });
                }}
              >
                Add Skill
              </button>
            </div>
            <div className="mx-auto w-fit mt-4">
              <button
                className="bg-red-600 p-1 rounded-sm text-white cursor-pointer w-48  ml-2 hover:bg-red-500 mx-auto text-center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <button
          className=" bottom-10 right-10 text-white fixed bg-red-500 rounded-full w-14 h-14"
          onClick={printDocument}
        >
          <DownloadIcon className="w-10 h-10 mx-auto" />
        </button>
      </div>
    </>
  );
}
