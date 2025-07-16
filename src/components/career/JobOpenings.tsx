"use client";

import { useJobsQuery } from "@/redux/features/career/career.api";
import { Calendar, Timer } from "lucide-react";
import ApplicationForm from "./ApplicationForm";
import { useState } from "react";

const JobOpenings = () => {
  const { data: jobs } = useJobsQuery("");
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6">
      <h1 className="text-3xl text-center font-medium pb-4">Job Openings</h1>
      {jobs?.result?.length > 0 ? (
        <div className="bg-[#202c24] p-6 rounded-xl text-white">
          {jobs?.result?.map((job: any) => (
            <div key={job.id}>
              <div className="md:flex justify-between items-center pb-4 border-b border-primary">
                <div>
                  <h1 className="text-3xl font-medium pb-2">{job.title}</h1>
                  <div className="flex md:text-xl font-medium items-center gap-1 md:gap-4">
                    <h1>{job.experiencelevel}</h1>
                    <Timer></Timer>
                    <h1>{job.jobType}</h1>
                    <Calendar></Calendar>
                    <h1>6 days/Week</h1>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(!open)}
                  className="bg-primary px-4 py-2 text-white rounded-2xl"
                >
                  Apply Now
                </button>
              </div>
              <div className="flex justify-between items-center pt-8">
                <div>
                  <h1>Salary: {job.salary}</h1>
                  <h1 className="pt-2">Job Description: {job.description}</h1>
                  <h1 className="pt-2">Requirements: {job.requirements}</h1>
                </div>
                <h1>Last Date: {job.lastDate}</h1>
              </div>
              {open && <ApplicationForm></ApplicationForm>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-medium pb-3">No Current Openings</h1>
          <p>
            We do not have any open positions at the moment. Please check <br />{" "}
            back later or send your resume to our HR department for <br />{" "}
            future opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobOpenings;
