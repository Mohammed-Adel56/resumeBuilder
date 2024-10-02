import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "@/service/GlobalApi";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const Education = () => {
  const { resumeInfo, setReumeInfo } = useContext(ResumeInfoContext);

  const [educationalList, setEducationalList] = useState(resumeInfo.education);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
        major: "",
        description: "",
      },
    ]);
  };
  const RemoveNewEducation = () => {
    setEducationalList(educationalList.slice(0, -1));
  };
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newEntries = educationalList.slice();
    // console.log(newEntries[index][name]);
    newEntries[index][name] = value;
    // console.log(newEntries);
    setEducationalList(newEntries);
  };
  const onSave = () => {
    setLoading(true);
    console.log(educationalList);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
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
  useEffect(() => {
    setReumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>
      <div>
        {educationalList.map((elem, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(event) => {
                    handleChange(event, index);
                  }}
                  defaultValue={elem.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(event) => {
                    handleChange(event, index);
                  }}
                  defaultValue={elem.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(event) => {
                    handleChange(event, index);
                  }}
                  defaultValue={elem.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  name="startDate"
                  type="date"
                  onChange={(event) => {
                    handleChange(event, index);
                  }}
                  defaultValue={elem.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  name="endDate"
                  type="date"
                  onChange={(event) => {
                    handleChange(event, index);
                  }}
                  defaultValue={elem.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(event) => {
                    handleChange(event, index);
                  }}
                  defaultValue={elem.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewEducation}>
            {" "}
            + Add More Education{" "}
          </Button>
          <Button variant="outline" onClick={RemoveNewEducation}>
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

export default Education;
