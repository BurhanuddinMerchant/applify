import Head from "next/head";
import Link from "next/link";
import canApplyPNG from "../assets/workflow/candidate_apply.png";
import canDash1PNG from "../assets/workflow/candidate_dashboard_1.png";
import canDash2PNG from "../assets/workflow/candidate_dashboard_2.png";
import canDash3PNG from "../assets/workflow/candidate_dashboard_3.png";
import canLoginPNG from "../assets/workflow/candidate_login.png";
import canRegisterPNG from "../assets/workflow/candidate_register.png";
import canProfile1PNG from "../assets/workflow/candidate_profile_1.png";
import canProfile2PNG from "../assets/workflow/candidate_profile_2.png";
import canResume1PNG from "../assets/workflow/candidate_resume_1.png";
import canResume2PNG from "../assets/workflow/candidate_resume_2.png";
import revDashPNG from "../assets/workflow/reviewer_dashboard.png";
import revRegisterPNG from "../assets/workflow/reviewer_register.png";
import revReview1PNG from "../assets/workflow/reviewer_review_detail_1.png";
import revReview2PNG from "../assets/workflow/reviewer_review_detail_2.png";
import revReview3PNG from "../assets/workflow/reviewer_review_detail_3.png";
import heroPng from "../assets/workflow/hero.jpg";

const flowList = [
  canRegisterPNG,
  canDash1PNG,
  canProfile1PNG,
  canProfile2PNG,
  canResume1PNG,
  canResume2PNG,
  canApplyPNG,
  canDash2PNG,
  revRegisterPNG,
  revReview1PNG,
  revReview2PNG,
  revReview3PNG,
  revDashPNG,
  canLoginPNG,
  canDash3PNG,
];
const header = [
  "Candidate Register",
  "Candidate Dashboard",
  "Candidate Prfile",
  "Candidate Prfile",
  "Candidate Resume",
  "Candidate Resume",
  "Candidate Applying",
  "Candidate Dashboard",
  "Reviewer Register",
  "Reviewer Review Application",
  "Reviewer Review Application",
  "Reviewer Review Application",
  "Reviewer Dashboard",
  "Candidate Login",
  "Candidate Dashboard",
];
export default function Home() {
  return (
    <div>
      <Head>
        <title>Applify</title>
        <meta name="Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" min-h-screen flex justify-evenly">
        <div className="w-1/2 my-auto">
          <img src={heroPng.src} />
        </div>
        <div className="my-auto">
          <h1 className="text-5xl text-black font-bold mb-10 ">
            Welcome to Applify
          </h1>
          <div className="flex justify-between">
            <Link href="login">
              <button className="bg-blue-500 p-2 w-[49%] text-white hover:bg-blue-400">
                Candidate Login
              </button>
            </Link>
            <Link href="reviewer/login">
              <button className="  ml-10 bg-blue-500 p-2 w-[49%] text-white hover:bg-blue-400">
                Reviewer Login
              </button>
            </Link>
          </div>
          <div className="text-center mt-2 font-light">
            (Scroll Down for Work Flow)
          </div>
        </div>
      </div>
      <div className="mt-14">
        <div className="text-3xl mb-10 text-center">Work Flow</div>
        {flowList.map((image, index) => (
          <div key={index} className="w-2/3 mx-auto mt-10">
            <div className="font-bold">
              {index + 1}.] {header[index]}
            </div>
            <img src={image.src} />
          </div>
        ))}
      </div>
    </div>
  );
}
