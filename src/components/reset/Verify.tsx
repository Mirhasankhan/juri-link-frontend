"use client";
import { useVerifyOtpMutation } from "@/redux/features/auth/authApi";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Verify = ({
  setActive,
  email,
}: {
  setActive: (value: string) => void;
  email: string;
}) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const numberCode = parseInt(code.join(""), 10);

    try {
      const response = await verifyOtp({ email, otp: numberCode.toString() });

      if (response.data) {
        toast.success(response.data.message);
        Cookies.set("token", response.data.result.accessToken);
        setActive("reset");
      } else if (response.error) {
        if ("data" in response.error) {
          const errorData = response.error.data as { message?: string };
          toast.error(errorData.message || "Something went wrong.");
        } else {
          toast.error("Unexpected error structure.");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("An unexpected error occurred.");
    } finally {
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-medium pb-4">Password Reset Request</h1>
      <p>
        We sent a code to{" "}
        <span className="font-medium">mirhasan000034@gmail.com</span>
      </p>
      <h2 className="text-lg font-bold mb-4">Enter 4-digit Code</h2>
      <div className="flex space-x-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            className="border p-2 w-16 h-16 text-center text-lg rounded-xl"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={code.join("").length !== 4 || isLoading}
        className={`mt-4 px-4 py-3  text-white w-60 font-bold ${
          code.join("").length === 4 ? "bg-primary" : "bg-gray-300"
        }`}
      >
        {isLoading ? (
          <LoaderCircle className="animate-spin mx-auto"></LoaderCircle>
        ) : (
          "Continue"
        )}
      </button>
      <Link href="/login" className="flex items-center gap-1 pt-6">
        <ArrowLeft size={15} /> Back to login
      </Link>
    </div>
  );
};

export default Verify;
