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
            <Image
              src={postImage}
              className="w-4/5 h-[420px] rounded-[8px]"
              height={400}
              width={400}
              alt="post"
            ></Image>
          </div>
          <div className="col-span-1">
            <p className="text-secondary font-medium">
              Don&apos;t have time to research?
            </p>
            <h1 className="text-3xl font-bold py-5">
              Specify your service type, urgency, and preferred mode — online or
              in-person.
            </h1>
            <p className="text-gray-500">
              Explain your legal need, select how quickly you need help, and choose the service format you prefer. Verified lawyers can comment on your post or message you directly, making it easier to compare guidance and get the right support fast. You stay fully in control of your request, and only engage with lawyers who fit your requirements. This helps you make faster, more confident decisions with clarity.
            </p>
            <button className="bg-secondary/10 mt-6 text-secondary py-2 px-5 rounded-[5px]">
              Post your need
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Research;
