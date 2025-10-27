import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePostQuery } from "@/redux/features/services/services.api";
import { MessageCircle } from "lucide-react";

const PostDetailModal = ({ id }: { id: string }) => {
  const { data: post } = usePostQuery(id);
  console.log(post?.data?.userId?.fullName);

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
          <DialogTitle>Comments of {post?.data?.userId?.fullName}&apos;s post</DialogTitle>
          <DialogDescription>Update Room Details</DialogDescription>
        </DialogHeader>
        <div>sdfsdfsdfsdf</div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
