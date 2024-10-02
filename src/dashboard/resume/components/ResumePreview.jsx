import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetialPreview from "./preview/PersonalDetialPreview";
import SummeryPreview from "./preview/SummeryPreview";
import ProfessionalExperiencePreview from "./preview/ProfessionalExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillesPreview from "./preview/SkillesPreview";

const ResumePreview = () => {
  const { resumeInfo, setReumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail */}
      <PersonalDetialPreview resumeInfo={resumeInfo} />

      {/* Summery */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      <ProfessionalExperiencePreview resumeInfo={resumeInfo} />

      {/* Educational */}
      <EducationalPreview resumeInfo={resumeInfo} />
      {/* Skilss */}
      <SkillesPreview resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
