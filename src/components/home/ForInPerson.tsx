import Container from "@/utils/Container";
import Image from "next/image";


import inPerson from "../../assets/in-persn.jpg";

import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";

const ForInPerson = () => {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-8 my-12">
        <div className="col-span-2 lg:col-span-1">
          <p className="text-secondary font-medium">IN PERSON CONSULTATION</p>
          <h1 className="text-3xl font-bold py-5">
            Meet with our <span className="text-secondary">Expert Lawyers</span>
          </h1>
          <p className="text-gray-500 pb-6">
            Connect directly with highly experienced legal professionals for
            clear, face-to-face guidance tailored to your specific situation.
            Whether you’re dealing with contracts, disputes, or personal
            matters, our experts help you understand your options, outline the
            right actions, and move forward with complete confidence. Get
            practical, human-focused legal insight that online chats alone can’t
            deliver.
          </p>
          <div className="flex items-center gap-1">
            <GiCheckMark className="text-secondary" />
            <p className="text-gray-500">
              In-depth case analysis and strategy discussion
            </p>
          </div>
          <div className="flex items-center gap-1">
            <GiCheckMark className="text-secondary" />
            <p className="text-gray-500">
              Personalized legal guidance tailored to your situation
            </p>
          </div>

          <div className="flex items-center gap-1">
            <GiCheckMark className="text-secondary" />
            <p className="text-gray-500">
              Clear action steps to move your case forward with confidence
            </p>
          </div>
          <Link href=""><button className="bg-secondary/10 mt-6 font-medium text-secondary py-2 px-5 rounded-[5px]">
            View In Person Lawyers
          </button></Link>
        </div>
        <div className="col-span-1 hidden lg:block">
          <Image
            src={inPerson}
            alt="alt"
            height={200}
            width={800}
            className=" rounded-[30px] "
          />
        </div>
        {/* <div className="col-span-1 relative w-4/5 ml-auto h-[430px] overflow-hidden  shadow-lg [clip-path:polygon(0%_20%,100%_0%,100%_100%,0%_80%)]">
          <Image
            src={inPerson}
            alt="alt"
            fill
            priority
            className="object-cover"
          />
        </div> */}
      </div>
    </Container>
  );
};

export default ForInPerson;
