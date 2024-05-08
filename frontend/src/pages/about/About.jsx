import React from "react";
import MetaData from "../../utils/MetaData";

const About = () => {
  return (
    <>
    <MetaData title={"About"}/>
      <div className="w-full h-60 relative mt-10">
        <img
          className="w-full h-full object-cover"
          src={"/Images/bg-01.jpg"}
          alt="background"
        />
        <h1
          className="absolute top-[50%] left-[50%] text-4xl -translate-x-10 -translate-y-5 
            text-white font-poppins font-medium 
        "
        >
          About
        </h1>
      </div>
      <div className="flex flex-col px-5 md:px-20 lg:px-40">
        <h1 className="my-10 md:my-14 font-roboto text-2xl text-slate-700 font-bold">
          Our Story
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24">
          <div className="font-poppins text-sm lg:text-[16px] tracking-wide leading-6 ">
            <p className="text-slate-500">
              "But I must explain to you how all this mistaken idea of
              denouncing pleasure and praising pain was born and I will give you
              a complete account of the system, and expound the actual teachings
              of the great explorer of the truth, the master-builder of human
              happiness. No one rejects, dislikes, or avoids pleasure itself,
              because it is pleasure, but because those who do not know how to
              pursue pleasure rationally encounter consequences that are
              extremely painful. Nor again is there anyone who loves or pursues
              or desires to obtain pain of itself, because it is pain, but
              because occasionally circumstances occur in which toil and pain
              can procure him some great pleasure. To take a trivial example."
            </p>
            <br />
            <p className="text-slate-500">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <br />
            <p>
              Any questions? Let us know in store at 8th floor, 379 Hudson St,
              New York, NY 10018 or call us on (+1) 96 716 6879
            </p>
          </div>
          <div className="flex justify-center items-center pl-1 pr-5">
            <div className="w-[170px] border-solid border-[3px]  border-slate-500 grow shrink">
              <img
                src={"/Images/about-01.jpg"}
                alt=""
                className=" w-[95%] h-[80%] translate-x-5 -translate-y-5 "
              />
            </div>
          </div>
        </div>

        <div className="my-24 grid grid-cols-1 lg:grid-cols-[1fr_2fr]  gap-12 lg:gap-24">
          <div className="flex justify-center items-center pl-1 pr-5">
            <div className="w-[170px] border-solid border-[3px]  border-slate-500 grow shrink">
              <img
                src={"/Images/about-02.jpg"}
                alt=""
                className=" w-[95%] h-[80%] translate-x-5 -translate-y-5 "
              />
            </div>
          </div>
          <div className="font-poppins text-sm lg:text-[16px] tracking-wide leading-6 ">
            <h1 className="font-roboto text-2xl font-bold text-slate-700 -mt-7">Our Mission</h1>
            <p className="text-sm text-slate-500 py-5">
              "But I must explain to you how all this mistaken idea of
              denouncing pleasure and praising pain was born and I will give you
              a complete account of the system, and expound the actual teachings
              of the great explorer of the truth, the master-builder of human
              happiness. No one rejects, dislikes, or avoids pleasure itself,
              because it is pleasure, but because those who do not know how to
              pursue pleasure rationally encounter consequences that are
              extremely painful. Nor again is there anyone who loves or pursues
              or desires to obtain pain of itself, because it is pain, but
              because occasionally circumstances occur in which toil and pain
              can procure him some great pleasure. To take a trivial example."
            </p>
            <div className="flex gap-10 h-auto">
                <p className="border-2 border-slate-600"></p>
                <div className="text-slate-500 italic">
                    <p>Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.</p>
                    <p className="">- Steve Jobs</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
