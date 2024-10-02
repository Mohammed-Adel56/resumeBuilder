import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";
const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setReumeInfo] = useState();
  useEffect(() => {
    console.log(params);
    setReumeInfo();
    getResumeInfo();
  }, []);
  const getResumeInfo = () => {
    GlobalApi.getResumeById(params?.resumeId)
      .then((res) => {
        console.log(res.data.data);
        setReumeInfo(res.data.data);
      })
      .catch((err) => toast.error(err.toString()));
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setReumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10  overflow-x-hidden ">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
