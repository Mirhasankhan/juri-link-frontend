import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";

const PostDetailModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
     <div className="flex items-center text-gray-500 gap-2">
            <MessageCircle size={20}></MessageCircle>
            <p className="font-medium">10</p>
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Mir Hasan Post</DialogTitle>
          <DialogDescription>Update Room Details</DialogDescription>
        </DialogHeader>
        <div>sdfsdfsdfsdf</div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
