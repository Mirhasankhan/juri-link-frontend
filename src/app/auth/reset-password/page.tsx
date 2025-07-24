"use client";
import ForgetPassword from "@/components/reset/Forget";
import NewPass from "@/components/reset/NewPass";
import Verify from "@/components/reset/Verify";
import React, { useState } from "react";

const ResetPassword = () => {
  const [active, setActive] = useState("verify");
  const [email, setEmail] = useState("")

  return (
    <div>
      {active === "forget" && <ForgetPassword setActive={setActive} setEmail={setEmail}/>}
      {active === "verify" && <Verify email={email} setActive={setActive}/> }
      {active === "reset" && <NewPass />}

      {/* <div className="flex justify-center items-center gap-6 py-12">
        <h1 className={`w-24 h-[6px] rounded-full ${active === "forget" ? "bg-blue-700" : "bg-gray-300"}`}></h1>
        <h1 className={`w-24 h-[6px] rounded-full ${active === "verify" ? "bg-blue-700" : "bg-gray-300"}`}></h1>
        <h1 className={`w-24 h-[6px] rounded-full ${active === "reset" ? "bg-blue-700" : "bg-gray-300"}`}></h1>
      </div> */}
    </div>
  );
};

export default ResetPassword;
