
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";

interface UserDetailsStepProps {
  onNext: () => void;
  onSubmit: (userDetails: {
    userName: string;
    userEmail: string;
    phone: string;
  }) => void;
}

const UserDetailsStep: React.FC<UserDetailsStepProps> = ({
  onNext,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    userName: string;
    userEmail: string;
    phone: string;
  }>();
  
    const {email,name} = useAppSelector(useCurrentUser)

  const handleFormSubmit = (data: {
    userName: string;
    userEmail: string;
    phone: string;
  }) => {
    onSubmit(data);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Details</h2>
        <p className="text-gray-600">
          Please provide your contact information for the appointment
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 max-w-md mx-auto"
      >
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block font-medium">Full Name</label>
          <input
         
            id="userName"
            type="text"
            placeholder="Enter your full name"
            defaultValue={name as string}
            {...register("userName")}
            className="w-full p-2 border rounded-xl"
          />
         
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Email</label>
          <input
            id="userEmail"
            type="email"
             defaultValue={email as string}
            readOnly
            {...register("userEmail", {
              required: "Email is required"
             
            })}
            className={`w-full p-3 border-2 rounded-xl transition-colors ${
              errors.userEmail
                ? "border-red-300 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />
          {errors.userEmail && (
            <p className="text-red-500 text-sm">{errors.userEmail.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block font-medium">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            })}
            className={`w-full p-3 border-2 rounded-lg transition-colors ${
              errors.phone
                ? "border-red-300 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="px-6 rounded-xl items-center bg-primary text-xl text-white py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsStep;
