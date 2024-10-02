import { Loader2, PlusSquare } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddResume = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    title: "",
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const naviagtor = useNavigate();
  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: form.title,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.createNewResume(data)
      .then((res) => {
        if (res) {
          setLoading(false);
          naviagtor(`/dashboard/resume/${res.data.data.documentId}/edit`);
        }
      })
      .catch((err) => {

        toast(err.toString());
        setLoading(false);
      });
  };
  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>ِAdd a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack Resume"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!form.title || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
