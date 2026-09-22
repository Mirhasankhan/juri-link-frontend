import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {  LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignOut = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(
      setUser({
        name: "",
        email: "",
        role: "",
        token: "",
      })
    );
    Cookies.remove("token");

    router.push("/");
  };
  return (
    <button
      onClick={() => logOut()}
      className="flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 w-full font-medium px-3 py-2 rounded-xl transition-colors text-sm"
    >
      <LogOut className="w-4 h-4" />
      <span>Sign Out</span>
    </button>
  );
};

export default SignOut;
