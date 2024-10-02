import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import GlobalApi from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";

const ViewReume = () => {
  const [resumeInfo, setReumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    getResumeInfo();
  }, []);
  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId)
      .then((res) => {
        setReumeInfo(res.data.data);
      })
      .catch((err) => {
        toast.error(err.toString());
      });
  };
  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setReumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 md:mx-20 lg:mx-36 ">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate Generate Resume is ready{" "}
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and you can share{" "}
            </p>
          </h2>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please opn url to see ",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeId +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 md:mx-20 lg:mx-36 ">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewReume;
