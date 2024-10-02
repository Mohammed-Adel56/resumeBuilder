import { Button } from "@/components/ui/button";
import PersonalDetailForm from "./form/PersonalDetailForm";
import { ArrowRight, LayoutGrid, ArrowLeft, Home } from "lucide-react";
import { useState } from "react";
import Summery from "./form/Summery";
import Experience from "./form/Experience";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-5 ">
          <Link to="/dashboard">
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex == 1 ? (
        <PersonalDetailForm enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Education enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Skills enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 6 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}
      {/* Summery */}

      {/* Experience */}

      {/* Educational Information */}

      {/* Skills */}
    </div>
  );
};

export default FormSection;
