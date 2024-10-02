import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import GlobalApi from "@/service/GlobalApi";
import { toast } from "sonner";
const ResumeItem = ({ resume, refershData }) => {
  const nav = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const onMenuClick = (url) => {
    nav(url);
  };
  const onDelete = async () => {
    setLoading(true);

    try {
      const res = await GlobalApi.deleteResumeById(resume?.documentId);
      // console.log(res);
      toast("Resume Deleted!");
      refershData();
      setOpenAlert(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.toString());
    }
  };
  return (
    <div>
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 bg-secondary flex justify-center items-center h-[280px] border border-primary rounded-lg transition-all hover:scale-105 hover:shadow-md shadow-primary cursor-pointer"
          style={{ borderColor: resume?.themeColor }}
        >
          <Notebook />
        </div>
      </Link>
      <div className="flex justify-between px-3">
        <h2 className="text-bold my-1">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                onMenuClick(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                onMenuClick(`/my-resume/${resume.documentId}/view`)
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                onMenuClick(`/my-resume/${resume.documentId}/view`)
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeItem;
