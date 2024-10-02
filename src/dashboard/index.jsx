import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import GlobalApi from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItem from "./components/ResumeItem";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetResumesList = () => {
    setLoading(true);
    GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        // console.log(res.data.data)

        setResumeList(res.data.data);

        setLoading(false);
      })
      .catch((err) => toast(err.toString()));
  };
  useEffect(() => {
    user && GetResumesList();
  }, [user]);
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next jon role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin " />
          </div>
        ) : (
          resumeList &&
          resumeList.map((ele, index) => {
            return (
              <ResumeItem
                key={index}
                resume={ele}
                refershData={GetResumesList}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
