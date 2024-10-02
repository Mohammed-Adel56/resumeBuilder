import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { AIchatSession } from "@/service/AIModel";
import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { toast } from "sonner";
const PROMPT =
  "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags";

const RichTextEditor = ({ onRichTextChange, defaultValue, index }) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setReumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const generateSummeryJob = async () => {
    // setLoading(true);
    if (!resumeInfo?.experience[index].title) {
      toast("Please Add Position Title");
      setLoading(false);
      return;
    } else {
      const propmt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo?.experience[index].title
      );
      const result = await AIchatSession.sendMessage(propmt);
      // console.log(result.response.text());
      const obj = result.response.text();
      const regex = /\[([^\]]+)\]/;
      const match = obj.match(regex);

      if (match && match[1]) {
        // Split the content inside the square brackets
        const arrayItems = match[1]
          .split('", "')
          .map((item) => item.replace(/(^"|"$)/g, ""));
        setLoading(false);

        // setReumeInfo({ ...resumeInfo });
        setValue(arrayItems.join(" "));
        onRichTextChange(arrayItems.join(" "));
      }
    }
  };

  function onChange(e) {
    setValue(e.target.value);
    onRichTextChange(e.target.value);
  }
  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <label className="text-xs">Summery</label>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary"
          onClick={generateSummeryJob}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate From AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor value={value} onChange={onChange}>
          <Toolbar>
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
