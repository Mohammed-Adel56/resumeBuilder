import { Button } from "@/components/ui/button";
import { ArrowBigRight, Atom, Edit, Share, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LandingCart from "./LandingCart";

const LandingPage = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="flex justify-center my-10 flex-col items-center">
        <h1 className="text-[50px] font-extrabold">
          Build Your Resume <span className="text-rose-700">With AI</span>
        </h1>
        <p className="text-gray-500 text-start">
          Effortlessly Craft Resume with Our AI-Powered Builder
        </p>
        <div className="flex justify-center my-10">
          <Button variant="outline" onClick={() => nav("/dashboard")}>
            Get Started <ArrowBigRight />
          </Button>
        </div>
        <div className="flex justify-center my-10 flex-col items-center">
          <h2 className="text-xl font-bold">How it Works?</h2>
          <p className="text-sm text-gray-500">
            Give mock interview in just 3 simpler easy step
          </p>
          <div className="flex flex-row gap-3 px-10 my-5">
            <LandingCart
              title="Write promot for your form"
              icon={<Atom size={30} />}
            />
            <LandingCart title="Edit Your Form" icon={<Edit size={30} />} />
            <LandingCart
              title="Share & Start Accepting Responses"
              icon={<Share2 size={30} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
