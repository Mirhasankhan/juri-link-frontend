import { Award } from "lucide-react";
import React from "react";

const Expertise = ({ lawyer }: { lawyer: any }) => {
  return (
    <div className="border p-6 rounded-[6px]">
      <div className="border-b-[0.5px] border-primary pb-6 ">
        <div className="flex items-center gap-2">
          <Award className="text-primary"></Award>
          <h1 className="text-xl font-medium">Areas of Expertise</h1>
        </div>
        <div className="grid grid-cols-3 pt-3 text-center gap-5">
          {lawyer?.specialization?.map((s: any) => (
            <h1
              key={s._id}
              className="w-full py-3 rounded-[6px] bg-primary text-white font-medium"
            >
              {s.serviceName}
            </h1>
          ))}

          
        </div>
      </div>
      <h1 className="text-xl text-primary pt-4 font-medium">
        Professional Background
      </h1>
      <p className="text-gray-500 font-medium pt-2">
        Sarah Johnson is a highly experienced corporate attorney with over 12
        years of expertise in mergers and acquisitions, securities law, and
        corporate governance. She has successfully represented Fortune 500
        companies in complex transactions worth over $2 billion.
      </p>
    </div>
  );
};

export default Expertise;
