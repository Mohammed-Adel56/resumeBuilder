import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "@/service/GlobalApi";
import { LayoutGrid } from "lucide-react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ThemeColor = () => {
  const { resumeInfo, setReumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const colors = [
    "#1E3E62",
    "#181C14",
    "#ffffff",
    "#B7E0FF",
    "#001F3F",
    "#D91656",
    "#FCFAEE",
    "#B8001F",
    "#507687",
    "#384B70",
    "#6256CA",
    "#3B3030",
    "#6439FF",
    "#4F75FF",
    "#00CCDD",
    "#295F98",
  ];
  const onColorSelect = (color) => {
    setReumeInfo({ ...resumeInfo, themeColor: color });
    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.updateResumeDetails(resumeId)
      .then((res) => {
        toast("Theme Color Updated");
      })
      .catch((err) => {
        toast(err.toString());
      });
    // localStorage.setItem("resumeInfo", JSON.stringify({ ...resumeInfo, themeColor: color }));
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((ele, index) => (
            <div
              onClick={() => onColorSelect(ele)}
              key={index}
              className="h-5 w-5 rounded border cursor-pointer hover:border-black"
              style={{ backgroundColor: ele }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
