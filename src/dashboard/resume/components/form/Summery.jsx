import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { AIchatSession } from "@/service/AIModel";
import GlobalApi from "@/service/GlobalApi";
import { LoaderCircle, Brain } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const propmt =
  "Job Title {jobTitle},Depends on Job title give me summery for my resume within 4-5 lines in JSON format with field experience Level and Summery with Experience level for fresher,Mid-Level,Experienced and JSON format like {jobTitle:'frontend',Summaries:[{experienceLevel:'fresher',summery:'I am fresher'}, {experienceLevel:'mid-level',summery:'I am mid-level'}, {experienceLevel:'experienced',summery:'I am experienced'}]}.";

const Summery = ({ enableNext }) => {
  const { resumeInfo, setReumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);
  useEffect(() => {
    resumeInfo && setSummery(resumeInfo?.summery);
  }, [resumeInfo]);
  useEffect(() => {
    // enableNext(false);
    summery &&
      setReumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);
  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROPMT = propmt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIchatSession.sendMessage(PROPMT);
    console.log(JSON.parse(result.response.text()));
    const obj = await JSON.parse(result.response.text());
    setAiGenerateSummeryList(obj);
    setLoading(false);
  };
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.updateResumeDetails(params?.resumeId, data)
      .then((res) => {
        enableNext(true);
        setLoading(false);
        toast("Details Updated");
      })
      .catch((err) => {
       
        setLoading(false);
        toast(err.toString());
      });
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summery</h2>
      <p>Add Summery For Your Job Title </p>
      <form className="mt-5" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summery</label>
          <Button
            variant="outline"
            size="sm"
            className="border-primary flex gap-2"
            type="button"
            onClick={() => GenerateSummeryFromAI()}
          >
            <Brain className="h-4 w-4" />
            Generate From AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          required
          onChange={(e) => setSummery(e.target.value)}
          defaultValue={summery}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
      {aiGeneratedSummeryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {Object.keys(aiGeneratedSummeryList.Summaries ?? {}).map(
            (ele, index) => {
              console.log(ele);
              const summaryObj = aiGeneratedSummeryList.Summaries[ele];
              if (summaryObj["experienceLevel"]) {
                return (
                  <div key={index}>
                    <p>
                      <strong>Experience Level:</strong>{" "}
                      {summaryObj["experienceLevel"]}
                    </p>
                    <p>
                      <strong>Summary:</strong> {summaryObj["summery"]}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <p>
                      <strong>Experience Level:</strong> {ele}
                    </p>
                    <p>
                      <strong>Summary:</strong> {summaryObj}
                    </p>
                  </div>
                );
              }
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Summery;
