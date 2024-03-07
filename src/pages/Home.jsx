import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Highlighted from "../components/core/homepage/Highlighted";
import CTAbutton from "../components/core/homepage/Button";
import CodeBlocks from "../components/core/homepage/CodeBlocks.jsx";
import "../App.css";
// Image and Video Import
import Banner from "../assets/Images/banner.mp4";
import TimeLineSection from "../components/core/homepage/TimeLineSection.jsx";
import Learning from "../components/core/homepage/Learning.jsx";
import TimelineSection from "../components/core/homepage/TimeLineSection.jsx";
import BecomeInstuctore from "../components/core/homepage/BecomeInstuctore.jsx";
import ExploreMore from "../components/core/homepage/ExploreMore.jsx";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <Link to={"/signup"}>
          <div className=" mx-auto mt-16 group rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className=" flex flex-row item-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-700">
              <p>Become an instructor</p>
              <FaArrowRightLong />
            </div>
          </div>
        </Link>

        {/* heading */}
        <div className=" text-left sm:text-center text-3xl sm:text-4xl font-semibold ">
          Empower Your Future with <Highlighted text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 sm:w-[80%] text-left sm:text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA button */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAbutton
            active={true}
            linkto={"/signup"}
          >
            Learn More
          </CTAbutton>
          <CTAbutton
            active={false}
            linkto={"/login"}
          >
            Book a Demo
          </CTAbutton>
        </div>
        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)] w-[1035px]"
            muted
            loop
            autoPlay
          >
            <source
              src={Banner}
              type="video/mp4"
            />
          </video>
        </div>
        {/* codeblocks */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-3xl sm:text-4xl font-semibold">
                Unlock your
                <Highlighted text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-3xl sm:text-4xl font-semibold lg:w-[50%]">
                <span>Start</span>
                <Highlighted text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
        <div className=" mx-auto max-w-maxContent flex flex-col gap-7">
          <ExploreMore />
        </div>

        {/* cod esection 3  */}
        <div className=" bg-pure-greys-5 text-richblack-700 w-[100vw]">
          <div className="homepage_bg h-[270px] ">
            <div className="h-[140px]"></div>

            <div className=" w-11/12 max-w-maxContent flex item-center justify-center gap-5 mx-auto">
              <div className="flex sm:flex-row gap-7 text-white">
                <CTAbutton
                  linkto={"/signup "}
                  active={true}
                >
                  {" "}
                  <div className="flex gap-3 items-center ">
                    Explore full Catalog
                    <FaArrowRightLong />
                  </div>{" "}
                </CTAbutton>
                <CTAbutton
                  active={false}
                  linkto={"/signup"}
                >
                  <div>Learn More</div>
                </CTAbutton>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
            {/* Job that is in Demand - Section 1 */}
            <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
              <div className="text-4xl font-semibold lg:w-[45%] ">
                Get the skills you need for a{" "}
                <Highlighted text={"job that is in demand."} />
              </div>
              <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                <div className="text-[16px]">
                  The modern StudyNotion is the dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.
                </div>
                <CTAbutton
                  active={true}
                  linkto={"/signup"}
                >
                  <div className="">Learn More</div>
                </CTAbutton>
              </div>
            </div>

            {/* Timeline Section - Section 2 */}
            <TimelineSection />

            {/* Learning Language Section - Section 3 */}
            <Learning />
          </div>
        </div>

        {/* section 4 become an instuctore  */}
        <BecomeInstuctore />
        <div>
          <h2 className="text-3xl">Reviwes from other learners</h2>
          <div className="h-[150px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
