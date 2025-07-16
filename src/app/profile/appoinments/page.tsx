"use client";
import Completed from "@/components/appointment/Completed";
import Upcoming from "@/components/appointment/Upcoming";
import Sidebar from "@/components/profile/Sidebar";
import Container from "@/utils/Container";
import React, { useState } from "react";

const AppointmentsPage = () => {
  const [active, setActive] = useState("upcoming");
  return (
    <Container>
      <div className="grid grid-cols-4 gap-6">
        <div className="hidden md:block md:col-span-1 border-r-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-4 md:col-span-3">
          <h1 className="text-xl font-semibold pb-4">My Appointments</h1>
          <div className="flex w-full gap-8">
            <button onClick={()=>setActive("upcoming")} className={`${active == "upcoming" ? "bg-primary text-white":"border border-primary text-primary bg-white"} w-full rounded-xl py-2 font-semibold`}>Upcoming</button>
           <button onClick={()=>setActive("completed")}  className={`${active == "completed" ? "bg-primary text-white":"border border-primary text-primary bg-white"} w-full rounded-xl py-2 font-semibold`}>completed</button>
          </div>
          {active == "upcoming" && <Upcoming></Upcoming>}
          {active == "completed" && <Completed></Completed>}
        </div>
      </div>
    </Container>
  );
};

export default AppointmentsPage;
