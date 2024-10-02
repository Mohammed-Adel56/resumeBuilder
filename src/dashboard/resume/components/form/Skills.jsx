import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
const Skills = () => {
  const { resumeInfo, setReumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [skillsList, setSkillsList] = useState(resumeInfo.skills);
  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveNewSkills = () => {
    setSkillsList(skillsList.slice(0, -1));
  };
  const handleChange = (index, event) => {
    const newEntries = skillsList.slice();
    if (event.target) {
      const { name, value } = event.target;
      newEntries[index][name] = value;
    } else {
      newEntries[index]["rating"] = event;
    }
    console.log(newEntries);
    setSkillsList(newEntries);
  };
  const onSave = () => {
    setLoading(true);
    // console.log(educationalList);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
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
      skills: skillsList,
    });
  }, [skillsList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your Top Skills </p>
      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border rounded-lg p-3 my-2"
          >
            <div>
              <label className="text-xs my-2">Name</label>
              <Input
                className="w-full"
                onChange={(e) => handleChange(index, e)}
                defaultValue={item.name}
                name="name"
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(e) => handleChange(index, e)}
              defaultValue={item.rating}
              name="rating"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewSkills}>
            {" "}
            + Add More Skill{" "}
          </Button>
          <Button variant="outline" onClick={RemoveNewSkills}>
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

export default Skills;
