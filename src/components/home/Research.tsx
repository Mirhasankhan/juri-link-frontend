"use client";
import Container from "@/utils/Container";
import postImage from "../../assets/post.png";
import Image from "next/image";

const Research = () => {
  return (
    <div className="bg-[#f8f8f8] py-24">
      <Container>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <Image src={postImage} className="w-4/5 h-[420px] rounded-[8px]" height={400} width={400} alt="post"></Image>
          </div>
          <div className="col-span-1"></div>
        </div>
      </Container>
    </div>
  );
};

export default Research;
