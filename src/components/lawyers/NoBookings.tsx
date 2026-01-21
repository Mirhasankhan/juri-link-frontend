import { File } from "lucide-react";
import Link from "next/link";

const NoBookings = () => {
  return (
    <div className="flex flex-col text-center items-center">
      <div className="bg-gray-50 p-8 rounded-full">
        <File size={70} className="text-gray-400"></File>
      </div>
      <h1 className="text-3xl font-medium py-2">Your schedule is clear</h1>
      <p className="text-gray-500">
        You don&apos;t have any upcoming <br />
        legal consultations
      </p>
      <Link href="/lawyers">      
        <button className="bg-secondary text-white px-16 py-2 rounded-[6px] mt-3">
          Explore Lawyers
        </button>
      </Link>
    </div>
  );
};

export default NoBookings;
