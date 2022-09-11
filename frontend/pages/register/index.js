import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import loginSVG from "../../assets/login.svg";
import { HomeIcon } from "@heroicons/react/solid";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("access") &&
      sessionStorage.getItem("access") !== undefined
    ) {
      router.push("/dashboard");
    }
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/candidate/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { user: formData },
      };
      let response = await axios(config);
      setFormData(() => ({ ...formData, username: "", password: "" }));
      sessionStorage.setItem("refresh", response.data.refresh);
      sessionStorage.setItem("access", response.data.access);
      router.push("/dashboard");
      setLoading(false);
    } catch (e) {
      setFormData(() => ({ ...formData, username: "", password: "" }));
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Register | Applify</title>
        <meta
          name="description"
          content="A Website to generate your own Youtube Wrapped"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-full flex-col bg-blue-100">
        {/* <NavBar active={{ explore: true }} /> */}
        <div className="mx-auto my-auto flex h-fit w-full flex-col-reverse justify-between rounded-lg bg-none p-10 sm:w-1/2 sm:flex-row sm:bg-white">
          <div className=" mx-auto my-auto h-fit w-fit rounded-md bg-white p-10  shadow-lg sm:bg-slate-200">
            <div className=" mb-2 flex justify-between">
              <h2 className="ml-1 cursor-pointer text-xl font-semibold text-blue-400">
                Register
              </h2>
              <HomeIcon
                className="my-auto mr-1 h-7 w-7 cursor-pointer text-blue-400 hover:text-blue-500"
                onClick={() => router.push("/")}
              />
            </div>
            <form className=" flex flex-col " onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Username"
                className="m-auto my-1 w-fit rounded-sm border-2 bg-white border-gray-300 p-1 hover:border-blue-300 focus:border-blue-400 text-black"
                name="username"
                requiblue
                onChange={handleChange}
                value={formData.username}
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="m-auto my-1 w-fit rounded-sm border-2 bg-white border-gray-300 p-1 hover:border-blue-300 focus:border-blue-400 text-black"
                name="email"
                requiblue
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="password"
                placeholder="Enter Password"
                minLength={6}
                className="m-auto my-1 w-fit rounded-sm border-2 bg-white border-gray-300 p-1 hover:border-blue-300 focus:border-blue-400 text-black"
                name="password"
                requiblue
                onChange={handleChange}
                value={formData.password}
              />
              <div className="mx-auto my-2 text-sm text-black">
                Already have an account ?{" "}
                <Link href="/login" className="cursor-pointer text-blue-400">
                  <section className="inline cursor-pointer font-medium text-blue-500">
                    SignIn Here
                  </section>
                </Link>
              </div>
              {isLoading ? (
                <p className=" mx-auto my-2 w-fit animate-bounce cursor-pointer rounded-md  bg-blue-600 px-2 py-1 text-blue-100">
                  Loading...
                </p>
              ) : (
                <button
                  type="submit"
                  className="hover:text-black-600 mx-auto my-2 w-fit cursor-pointer rounded-md border-2 border-blue-600 bg-blue-600 px-2 py-1 text-white hover:bg-white hover:text-blue-600  "
                >
                  Register
                </button>
              )}
            </form>
          </div>
          <div className="my-auto ml-10 hidden w-full sm:block sm:w-96">
            <img src={loginSVG.src} className="w-full" alt="login" />
          </div>
        </div>
      </div>
    </>
  );
}
