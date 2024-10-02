import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const Experience = () => {
  const { resumeInfo, setReumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [experienceList, setExperienceList] = useState(resumeInfo.experience);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    // console.log(newEntries[index][name]);
    newEntries[index][name] = value;
    // console.log(newEntries);
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };
  const RemoveNewExperience = () => {
    setExperienceList(experienceList.slice(0, -1));
  };
  const handleRichTextChange = (index, event) => {
    // console.log(event);
    const newEntries = experienceList.slice();
    newEntries[index]["workSummery"] = event;
    setExperienceList(newEntries);
    console.log(experienceList);
    setReumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  };
  useEffect(() => {
    setReumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);
  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    // console.log(experience);

    GlobalApi.updateResumeDetails(params?.resumeId, data).then(
      (res) => {
        
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        toast(error);
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add Your previous Job Experience</p>
      <div>
        {experienceList &&
          experienceList.map((ele, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={ele.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={ele.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={ele.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={ele.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={ele.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={ele.endDate}
                  />
                </div>
                <div className="col-span-2">
                  {/* Work Summery */}
                  <RichTextEditor
                    index={index}
                    defaultValue={ele?.workSummery}
                    onRichTextChange={(event) =>
                      handleRichTextChange(index, event)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewExperience}>
            {" "}
            + Add More Experience{" "}
          </Button>
          <Button variant="outline" onClick={RemoveNewExperience}>
            {" "}
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Experience;
